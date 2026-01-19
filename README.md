# ETH Simple Faucet

A decentralized faucet application built on Ethereum. This project deploys a custom ERC-20 token and a Faucet smart contract that dispenses tokens to users with a time-lock mechanism to prevent abuse.

## Features
- **Custom ERC-20 Token:** Built using OpenZeppelin standards.
- **Time-Lock Mechanism:** Users can only claim tokens once every 24 hours (configurable).
- **Owner Controls:** The owner can replenish the faucet or adjust the drip amount.

## Tech Stack
- Solidity ^0.8.19
- Hardhat (configured for flat structure)
- Ethers.js

## Installation

1. **Install Dependencies:**
   ```bash
   npm install
