// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import the IERC20 interface from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CrowdZeroChild.sol";

// A smart contract for escrow that generates child smart contracts for fundraising
contract CrowdZero {
    // The owner of the contract, who can create and destroy new child contracts
    address public owner;

    // The token contract that is used for the fundraising
    IERC20 public token;

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
    constructor(IERC20 _token) {
        // Assign the owner to the sender of the transaction
        owner = msg.sender;
        // Assign the token to the parameter
        token = _token;
    }

    // A function that creates a new child contract with the given parameters
    function createChild(address _receiver, uint256 _goal) public onlyOwner {
        // Create a new child contract with the given receiver and goal
        CrowdZeroChild child = new CrowdZeroChild(_receiver, _goal);
        // Emit an event with the address of the created child contract
        emit ChildCreated(address(child));
        // Add the address of the child contract to the array
        children.push(address(child));
    }

    function getPublicKey() public view onlyOwner returns (address[] memory) {
        return children;
    }

        // Function to return the child contract address, goal amount, amount reached, and contract activation status
    function getChildContractDetails(uint256 index) public view returns (address, uint256, uint256, bool) {
        require(index < children.length, "Invalid index");
        
        // Get child contract instance
        CrowdZeroChild childContract = CrowdZeroChild(children[index]);
        
        // Return the child contract address, goal amount, amount reached, and contract activation status
        return (
            address(childContract),
            childContract.goal(),
            childContract.balance(),
            childContract.active()
        );
    }
}