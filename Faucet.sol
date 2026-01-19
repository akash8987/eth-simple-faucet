// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    IERC20 public token;
    uint256 public dripAmount = 100 * 10**18;
    uint256 public lockTime = 1 days;

    mapping(address => uint256) public nextAccessTime;

    event Withdrawal(address indexed receiver, uint256 amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function requestTokens() public {
        require(msg.sender != address(0), "Invalid address");
        require(token.balanceOf(address(this)) >= dripAmount, "Insufficient faucet balance");
        require(block.timestamp >= nextAccessTime[msg.sender], "Cooldown active. Try later.");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, dripAmount);

        emit Withdrawal(msg.sender, dripAmount);
    }
    
    // Allow owner to fund the faucet manually
    function fundFaucet(uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
    }
}
