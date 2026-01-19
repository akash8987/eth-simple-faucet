const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy Token
  const Token = await hre.ethers.getContractFactory("FaucetToken");
  const token = await Token.deploy(1000000); // 1M Initial Supply
  await token.waitForDeployment();
  console.log("Token deployed to:", token.target);

  // 2. Deploy Faucet
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(token.target);
  await faucet.waitForDeployment();
  console.log("Faucet deployed to:", faucet.target);

  // 3. Fund Faucet (Transfer 50% of supply to faucet)
  const amountToFund = hre.ethers.parseEther("500000"); 
  await token.transfer(faucet.target, amountToFund);
  console.log("Faucet funded with 500,000 tokens");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
