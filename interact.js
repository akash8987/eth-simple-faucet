const hre = require("hardhat");

async function main() {
    // Replace with actual deployed addresses after running deploy.js
    const FAUCET_ADDR = "0x..."; 
    const [signer] = await hre.ethers.getSigners();

    const Faucet = await hre.ethers.getContractAt("Faucet", FAUCET_ADDR);
    
    console.log(`Requesting tokens for ${signer.address}...`);
    const tx = await Faucet.requestTokens();
    await tx.wait();
    
    console.log("Tokens received successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
