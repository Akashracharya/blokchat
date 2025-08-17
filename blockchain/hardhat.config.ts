import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// The existing configuration you had for Ganache
const GANACHE_PRIVATE_KEY = "0x9d85f58fe8aadf963d0d24e2a0ca0f21bd18a94eb5261899af76f0940727c131"; // Make sure to replace this!

const config: HardhatUserConfig = {
  // We are changing this from a simple string to an object
  solidity: {
    version: "0.8.24", // You can specify a version here
    settings: {
      viaIR: true, // This is the line that enables the IR pipeline
    },
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [GANACHE_PRIVATE_KEY],
    },
  },
};

export default config;