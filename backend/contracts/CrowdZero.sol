// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import the IERC20 interface from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// A child smart contract that raises funds for a receiver and sends them when the goal is reached or the deadline is met
contract CrowdZeroChild {
    // The receiver of the funds, who deployed the contract
    address public receiver;

    // The goal of the fundraising, in tokens
    IERC20 public goal;

    // The current balance of the contract, in tokens
    IERC20 public balance;

    // The start time of the contract, in seconds since the Unix epoch
    uint256 public startTime;

    // The end time of the contract, in seconds since the Unix epoch
    uint256 public endTime;

    // A boolean indicating whether the contract is active or not
    bool public active;

    // A mapping that stores the donations of each address
    mapping(address => uint256) public donations;

    // An event emitted when a donation is received
    event DonationReceived(address donor, uint256 amount);

    // An event emitted when funds are sent to the receiver
    event FundsSent(address receiver, uint256 amount);

    // An event emitted when the contract is canceled
    event ContractCanceled();

    // An event emitted when an error occurs
    event Error(string message);

    // An event emitted when a donation is withdrawn
    event DonationWithdrawn(address donor, uint256 amount);

    // An event emitted when the contract is crowdzeroed
    event CrowdZeroed(address from, uint256 input, uint256 output);

    // A modifier that checks if the contract is active
    modifier isActive() {
        // Check that the contract is active
        require(active, "Contract is not active");
        // Continue execution
        _;
    }

    // The constructor of the contract, which receives the receiver and goal as parameters
    constructor(address _receiver, IERC20 _goal) {
        // Set the receiver and goal
        receiver = _receiver;
        goal = _goal;

        // Set the initial balance to the token contract
        balance = IERC20(address(this));

        // Set the start time to the current moment
        startTime = block.timestamp;

        // Set the end time to seven days after the start
        endTime = startTime + 7 days;

        // Set the contract as active
        active = true;
    }

    // A function that allows receiving donations while the contract is active
    function donate(uint256 _amount) public isActive {
        // Require that the sent value is greater than zero
        require(_amount > 0, "Sent value must be greater than zero");

        // Transfer the tokens from the sender to the contract
        balance.transferFrom(msg.sender, address(this), _amount);

        // Update the donation amount of the sender
        donations[msg.sender] += _amount;

        // Emit an event with the donor and sent value
        emit DonationReceived(msg.sender, _amount);

        // Check if the goal has been reached
        checkGoalReached();
    }

    // A function that checks if the goal has been reached and sends the funds to the receiver if so
    function checkGoalReached() public isActive {
        // If the balance is greater than or equal to the goal
        if (balance.balanceOf(address(this)) >= goal.balanceOf(address(this))) {
            // Send the balance to the receiver
            sendFunds();
        }
    }

    // A function that sends the funds to the receiver and deactivates the contract
    function sendFunds() private isActive {
        // Require that the balance is greater than or equal to the goal
        require(balance.balanceOf(address(this)) >= goal.balanceOf(address(this)), "Not enough funds in balance");
        // Transfer the balance to the receiver
        balance.transfer(receiver, balance.balanceOf(address(this)));
        // Emit an event with the receiver and the balance
        emit FundsSent(receiver, balance.balanceOf(address(this)));
        // Reset the balance to zero
        balance = IERC20(address(0));
        // Deactivate the contract
        active = false;
        // Emit an event that the contract is crowdzeroed
        emit CrowdZeroed(msg.sender, goal.balanceOf(address(this)), balance.balanceOf(address(this)));
    }

    // A function that cancels the contract and returns the funds to the sender
    function cancel() public isActive {
        // Require that the sender is the receiver
        require(
            msg.sender == receiver,
            "Only the receiver can cancel the contract"
        );
        // Emit an event that the contract is canceled
        emit ContractCanceled();
        // Transfer the balance to the receiver
        balance.transfer(receiver, balance.balanceOf(address(this)));
        // Reset the balance to zero
        balance = IERC20(address(0));
        // Deactivate the contract
        active = false;
    }

    // A function that allows the donor to withdraw their donation if the contract is not fulfilled
    function withdraw() public isActive {
        // Require that the sender is a donor
        require(donations[msg.sender] > 0, "You are not a donor");
        // Require that the contract has not reached the goal nor sent the funds
        require(
            balance.balanceOf(address(this)) < goal.balanceOf(address(this)) && block.timestamp < endTime,
            "Contract is fulfilled"
        );
        // Store the donation amount in a local variable
        uint256 amount = donations[msg.sender];
        // Reset the donation amount of the sender
        donations[msg.sender] = 0;
        // Transfer the donation amount back to the sender
        balance.transfer(msg.sender, amount);
        // Emit an event with the sender and the amount
        emit DonationWithdrawn(msg.sender, amount);
    }
}

// A smart contract for escrow that generates child smart contracts for fundraising
contract CrowdZero {
    // The owner of the contract, who can create and destroy new child contracts
    address public owner;

    // The token contract that is used for the fundraising
    IERC20 public token;

    // The time limit for each child contract, in seconds
    uint256 public timeLimit;

    // An array of the addresses of the child contracts
    address[] public children;

    // An event emitted when a new child contract is created
    event ChildCreated(address child);

    // An event emitted when the contract is destroyed
    event ContractDestroyed();

    // A modifier that only allows the contract owner to execute a function
    modifier onlyOwner() {
        // Check that the sender is the owner
        require(
            msg.sender == owner,
            "Only the owner can execute this function"
        );
        // Continue execution
        _;
    }

    // The constructor of the contract, which sets the owner, the token and the time limit
    constructor(IERC20 _token, uint256 _timeLimit) {
        // Assign the owner to the sender of the transaction
        owner = msg.sender;
        // Assign the token to the parameter
        token = _token;
        // Assign the time limit to the parameter
        timeLimit = _timeLimit;
    }

    // A function that creates a new child contract with the given parameters
    function createChild(address _receiver, IERC20 _goal) public onlyOwner {
        // Create a new child contract with the given receiver and goal
        CrowdZeroChild child = new CrowdZeroChild(_receiver, _goal);
        // Emit an event with the address of the created child contract
        emit ChildCreated(address(child));
        // Add the address of the child contract to the array
        children.push(address(child));
    }

    // A function that destroys the contract and returns the tokens to the owner
    function destroy() public onlyOwner {
        // Emit an event that the contract is destroyed
        emit ContractDestroyed();

        // Transfer the remaining tokens to the owner
        uint256 remainingBalance = token.balanceOf(address(this));
        token.transfer(owner, remainingBalance);

        // Remove the selfdestruct function
    }
}