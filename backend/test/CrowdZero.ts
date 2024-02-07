import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer, Wallet } from "ethers";

describe("CrowdZero", function () {
  let CrowdZero: any;
  let crowdZero: any;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    CrowdZero = await ethers.getContractFactory("CrowdZero");
    crowdZero = await CrowdZero.deploy(await addr1.getAddress(), "0x0000000000000000000000000000000000001010", 80001);
    await crowdZero.deployed();
  });

  it("Should set the owner, token, and time limit correctly", async function () {
    expect(await crowdZero.owner()).to.equal(await owner.getAddress());
    expect(await crowdZero.timeLimit()).to.equal(3600);
  });

  it("Should create a new child contract", async function () {
    await crowdZero.createChild(await addr2.getAddress(), "0x0000000000000000000000000000000000000000");
    const children = await crowdZero.children();
    expect(children.length).to.equal(1);
  });

  it("Should destroy the contract and return tokens to the owner", async function () {
    const initialBalance = await ethers.provider.getBalance(await owner.getAddress());
    await crowdZero.destroy();
    const finalBalance = await ethers.provider.getBalance(await owner.getAddress());
    expect(finalBalance).to.be.above(initialBalance);
  });
});
