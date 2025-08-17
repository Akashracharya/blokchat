import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Blokchat contract...");

  const Blokchat = await ethers.getContractFactory("Blokchat");
  const blokchat = await Blokchat.deploy();
  await blokchat.waitForDeployment();

  const contractAddress = await blokchat.getAddress();
  console.log(`Blokchat contract deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});