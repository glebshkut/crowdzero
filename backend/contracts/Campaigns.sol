// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

    library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    }

    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }


    interface IZokratesVerifier {
    function verifyTx(Proof memory proof, uint[1] memory input) external view returns (bool r);
    }

    contract Campaigns {

        IZokratesVerifier zokratesVerifier;

        

    struct Campaign {
        uint256 campaignId;
        address creator;
        uint256 goal;
        uint256 raised;
        string name;
        string image;
        string description;
        bool complete;
        uint256 deadline;
        }

    // Array to store all campaigns
    Campaign[] public campaigns;
    uint256 public id = 0;
    mapping (address => uint256) donations;
    // Event to log campaign creation
    event CampaignCreated(address indexed creator, uint256 indexed goal, uint256 _id);

    constructor(address zokratesVeriferAddress) {
        zokratesVerifier = IZokratesVerifier(zokratesVeriferAddress);
    }

    // Function to create a new campaign
    function createCampaign(uint256 _goal, string memory _name, string memory _image, string memory _description) public {
        Campaign memory newCampaign = Campaign({
         campaignId: id,
         creator: msg.sender,
         goal: _goal,
         raised: 0,
         name: _name,
         image: _image,
         description: _description,
         complete: false,
         deadline: block.timestamp + 7 days
      });

      campaigns.push(newCampaign);
        emit CampaignCreated(msg.sender, _goal, id);
        id++;
    }

    // Function to donate to a campaign
    function donate(uint256 amount) external payable {
        require(amount > 0, "Invalid donation amount");

    }

    function sendProof(Proof memory proof, uint[1] memory input, uint _id, uint amount) public {
        // ZK verification
        require(zokratesVerifier.verifyTx(proof, input) == true, "Invalid proof");
        require(_id < campaigns.length, "Invalid campaign ID");
        // Your custom logic
        Campaign storage campaign = campaigns[_id];
        campaign.raised += amount;
        donations[campaign.creator] += amount;
    }

    // Function to get the total amount raised for a campaign
    function withdraw(uint256 campaignId) external{
        require(campaignId < campaigns.length, "Invalid campaign ID");
        require(getCreator(campaignId) == msg.sender, "caller not the creator of the campaign");
        require(checkComplete(campaignId), "campaign not ended");
        uint amount = donations[msg.sender];
        donations[msg.sender] = 0;
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        require(ok);
        
    }

    // Function to get the donation amount for a specific stealth address in a campaign
    
    function getCreator(uint256 campaignId) internal view returns(address) {
     return campaigns[campaignId].creator;
   }

   function checkComplete(uint256 campaignId) internal returns(bool){
    if(block.timestamp > campaigns[campaignId].deadline){
      campaigns[campaignId].complete = true;
    }
    return campaigns[campaignId].complete;
   }

   receive() external payable{
    require(msg.value > 0, "Amount must be greater than 0");
   }
  
}