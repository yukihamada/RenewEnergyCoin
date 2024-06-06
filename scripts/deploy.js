
async function main() {
  const REC = await ethers.getContractFactory("RenewEnergyCoin");
  const rec = await REC.deploy(1000);
  await rec.deployed();
  console.log("RenewEnergyCoin deployed to:", rec.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

