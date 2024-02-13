// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import the IERC20 interface from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// A child smart contract that raises funds for a receiver and sends them when the goal is reached or the deadline is met
contract CrowdZeroChild {
    // The receiver of the funds, who deployed the contract
    address public receiver;

    // The goal of the fundraising, in tokens
    uint256 public goal;

    // The current balance of the contract, in tokens
    uint256 public balance;

    // The start time of the contract, in seconds since the Unix epoch
    uint256 public startTime;

    // The end time of the contract, in seconds since the Unix epoch
    uint256 public endTime;

    // A boolean indicating whether the contract is active or not
    bool public active;

    // The token contract that is used for the fundraising
    IERC20 public token; 

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

    // An event emitted when the contract is deactivated
    event ContractDeactivated();

    // A modifier that checks if the contract is active
    modifier isActive() {
        // Check that the contract is active
        require(active, "Contract is not active");
        // Continue execution
        _;
    }

    // The constructor of the contract, which receives the receiver and goal as parameters
    constructor(address _receiver, uint256 _goal) {
        // Set the receiver and goal
        receiver = _receiver;
        goal = _goal;

        // Set the initial balance to zero
        balance = 0;

        // Set the start time to the current moment
        startTime = block.timestamp;

        // Set the end time to seven days after the start
        endTime = startTime + 7 days;

        // Set the contract as active
        active = true;
    }

    // A function that allows receiving donations while the contract is active
    function donate(uint256 _amount) public isActive {
        // Require that the sent value is equal or greater than 10
        require(_amount >0.0000, "Sent value must equal or greater than 10");

        // Transfer the tokens from the sender to the contract
        token.transferFrom(msg.sender, address(this), _amount);

        // Update the donation amount of the sender
        donations[msg.sender] += _amount;

        // Update the balance of the contract
        balance += _amount;

        // Emit an event with the donor and sent value
        emit DonationReceived(msg.sender, _amount);

        // Check if the goal has been reached
        checkGoalReached();
    }

    // A function that checks if the goal has been reached and sends the funds to the receiver if so
    function checkGoalReached() public isActive {
        // If the balance is greater than or equal to the goal
        if (balance >= goal) {
            // Send the balance to the receiver
            sendFunds();
        }
    }

    // A function that sends the funds to the receiver and deactivates the contract when the end time is reached
    function sendFunds() private {
        // Require that the end time has been reached
        require(block.timestamp >= endTime, "End time has not been reached yet");
        // Require that the balance is greater than or equal to the goal
        require(balance >= goal, "Not enough funds in balance");
        // Transfer the balance to the receiver
        token.transfer(receiver, balance);
        // Emit an event with the receiver and the balance
        emit FundsSent(receiver, balance);
        // Reset the balance to zero
        balance = 0;
        // Deactivate the contract
        active = false;
        // Emit an event that the contract is crowdzeroed
        emit CrowdZeroed(msg.sender, goal, balance);
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
        token.transfer(receiver, balance);
        // Reset the balance to zero
        balance = 0;
        // Deactivate the contract
        active = false;
    }

    // A function that allows the donor to withdraw their donation within the withdrawal period
    function withdraw() public isActive {
        // Require that the sender is a donor
        require(donations[msg.sender] > 0, "You are not a donor");
        // Require that the contract has not reached the goal
        require(balance < goal, "Contract has reached the goal");
        // Require that the current time is within the withdrawal period
        require(block.timestamp >= endTime && block.timestamp <= endTime + 7 days, "Withdrawal period has ended");
        // Store the donation amount in a local variable
        uint256 amount = donations[msg.sender];
        // Reset the donation amount of the sender
        donations[msg.sender] = 0;
        // Update the balance of the contract
        balance -= amount;
        // Transfer the donation amount back to the sender
        token.transfer(msg.sender, amount);
        // Emit an event with the sender and the amount
        emit DonationWithdrawn(msg.sender, amount);
    }

    // A function that allows the receiver to withdraw funds after 14 days of contract creation, if the amont is not 0
    function withdrawAfterTime() public {
        // Require que hayan pasado al menos 7 días desde el tiempo final
        require(block.timestamp >= endTime + 7 days, "No han pasado 7 dias desde el tiempo final");
        // Require que el monto sea mayor que 0
        require(balance > 0, "El monto es 0");
        // Transferir el balance restante al receptor
        token.transfer(receiver, balance);
        // Emitir un evento con el receptor y el balance restante
        emit FundsSent(receiver, balance);
        // Reiniciar el balance a 0
        balance = 0;
        // Desactivar el contrato
        active = false;
        // Emitir un evento indicando que el contrato ha sido desactivado
        emit ContractDeactivated();
    }
}