const { expect } = require("chai");
const hre = require("hardhat");

describe("Faucet Contract", function () {
  let token, faucet, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await hre.ethers.getSigners();
    
    // Deploy Token
    const Token = await hre.ethers.getContractFactory("FaucetToken");
    token = await Token.deploy(1000000);

    // Deploy Faucet
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    faucet = await Faucet.deploy(token.target);

    // Fund Faucet
    await token.transfer(faucet.target, hre.ethers.parseEther("1000"));
  });

  it("Should allow a user to request tokens", async function () {
    await faucet.connect(addr1).requestTokens();
    const balance = await token.balanceOf(addr1.address);
    expect(balance).to.equal(hre.ethers.parseEther("100"));
  });

  it("Should prevent withdrawal before cooldown", async function () {
    await faucet.connect(addr1).requestTokens();
    await expect(
      faucet.connect(addr1).requestTokens()
    ).to.be.revertedWith("Cooldown active. Try later.");
  });
});
