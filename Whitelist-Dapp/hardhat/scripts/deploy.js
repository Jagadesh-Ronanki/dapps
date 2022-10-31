const { ethers } = require("hardhat");

async function main() {
  const whitelistContract = await ethers.getContractFactory("Whitelist");
  const deploymentWhitelistContract = await whitelistContract.deploy(10);
  await deploymentWhitelistContract.deployed();
  console.log("whitelist contract address: ", deploymentWhitelistContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });