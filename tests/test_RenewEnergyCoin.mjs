
import hardhat from "hardhat";


import { expect } from "chai";


import * as chai from "chai";


import chaiAsPromised from "chai-as-promised";

import chaiBn from "chai-bn";
chai.use(chaiBn(ethers.BigNumber));




const { ethers } = hardhat;



describe("RenewEnergyCoin", function () {
  let RenewEnergyCoin;
  let rec;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    RenewEnergyCoin = await ethers.getContractFactory("RenewEnergyCoin");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    rec = await RenewEnergyCoin.deploy(1000);
    await rec.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await rec.balanceOf(owner.address)).to.be.bignumber.equal(1000);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await rec.transfer(addr1.address, 50);
      const addr1Balance = await rec.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await rec.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await rec.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await rec.balanceOf(owner.address);

      await expect(
        rec.connect(addr1).transfer(owner.address, 1)
      ).to.be.rejectedWith('ERC20InsufficientBalance');

      expect(await rec.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});

