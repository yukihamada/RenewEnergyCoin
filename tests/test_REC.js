
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RenewEnergyCoin", function () {
  let REC;
  let rec;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    REC = await ethers.getContractFactory("RenewEnergyCoin");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    rec = await REC.deploy(1000);
    await rec.deployed();
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await rec.balanceOf(owner.address);
    expect(await rec.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    await rec.transfer(addr1.address, 50);
    const addr1Balance = await rec.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);

    await rec.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await rec.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });

  it("Should mint tokens", async function () {
    await rec.mint(owner.address, 100);
    const ownerBalance = await rec.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1100);
  });

  it("Should burn tokens", async function () {
    await rec.burn(100);
    const ownerBalance = await rec.balanceOf(owner.address);
    expect(ownerBalance).to.equal(900);
  });
});

