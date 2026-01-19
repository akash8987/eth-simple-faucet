// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FaucetToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("TestFlow", "FLOW") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    // Allow the faucet contract to mint more if needed
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
