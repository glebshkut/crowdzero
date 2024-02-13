import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";

describe("CrowdZero", function () {
  let CrowdZero: any;
  let crowdZero: any;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    // Obtener las direcciones de prueba
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    addr1 = accounts[1];
    addr2 = accounts[2];

    // Desplegar el contrato padre con el token
    // const currentDate = Math.floor(Date.now() / 1000);
    CrowdZero = await ethers.getContractFactory("CrowdZero");
    crowdZero = await CrowdZero.deploy("0x0000000000000000000000000000000000000000");
  });

  it("Should set the owner, token, and time limit correctly", async function () {
    // Test to ensure that the owner of the CrowdZero contract is correctly set to the deploying address
    // and that the token address is correctly set to the provided token address
    expect(await crowdZero.owner()).to.equal(await owner.getAddress()); // Verifies the owner address
    expect(await crowdZero.token()).to.equal("0x0000000000000000000000000000000000000000"); // Verifies the token address
  });

  it("Should create a new child contract", async function () {
    // Test to ensure that a new child contract is successfully created when calling the createChild function
    // with the provided receiver address and goal amount
    await crowdZero.createChild(await addr2.getAddress(), 1000); // Creates a new child contract
    const arrayChildren = await crowdZero.getPublicKey(); // Retrieves the array of child contract addresses
    expect(arrayChildren.length).to.be.greaterThan(0); // Verifies that at least one child contract address exists
  });

  describe("Single deployment of CrowdZeroChild", function () {
    beforeEach(async function () {
      // Create a new child contract
      await crowdZero.createChild(await addr2.getAddress(), 1000);
    });

    it("Should create a new child contract with correct parameters", async function () {
      const goal = 1000; // Amount goal for the child contract
      const receiver = await addr2.getAddress(); // Wallet address to receive funds

      // Get the address of the newly created child contract
      const children = await crowdZero.getPublicKey();
      const childAddress = children[children.length - 1];

      // Retrieve the child contract instance
      const childContract = await ethers.getContractAt("CrowdZeroChild", childAddress);

      // Verify if the child contract has received the correct parameters
      expect(await childContract.receiver()).to.equal(receiver);
      expect(await childContract.goal()).to.equal(goal);
    });

    it("Should return correct details of a child contract", async function () {
      // Get the address of the newly created child contract
      const children = await crowdZero.getPublicKey();
      const childAddress = children[children.length - 1];

      // Retrieve the child contract instance
      const childContract = await ethers.getContractAt("CrowdZeroChild", childAddress);

      // Call getChildContractDetails function
      const childDetails = await crowdZero.getChildContractDetails(children.length - 1);

      // Verify if the returned details match the child contract's properties
      expect(childDetails[0]).to.equal(childAddress);
      expect(childDetails[1]).to.equal(1000); // Assuming the goal is set to 1000 in the child contract constructor
      expect(childDetails[2]).to.equal(0); // The balance of the child contract should be 0 since no donations are made in the test
      expect(childDetails[3]).to.equal(true); // Assuming the child contract is active upon creation
    });
  });

  describe("CrowdZeroChild fuctions", async function () {

    let crowdZero;

    beforeEach(async function () {
      crowdZero = await CrowdZero.deploy("0x0000000000000000000000000000000000000000")
      await crowdZero.createChild(await addr2.getAddress(), 1000);
    });

    it("should allow receiving donations while the contract is active", async function () {
      // Implementar las pruebas aquí
    });

    it("should check if the goal has been reached and send funds to the receiver if so", async function () {
      // Implementar las pruebas aquí
    });

    it("should send the funds to the receiver and deactivate the contract when the end time is reached", async function () {
      // Implementar las pruebas aquí
    });

    it("should cancel the contract and return the funds to the sender", async function () {
      // Implementar las pruebas aquí
    });

    it("should allow the donor to withdraw their donation within the withdrawal period", async function () {
      // Implementar las pruebas aquí
    });

    it("should allow the receiver to withdraw funds after 14 days of contract creation if the amount is not 0", async function () {
      // Implementar las pruebas aquí
    });
  });
});