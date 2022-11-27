require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/4-dFvfsLXlMzunhf8snXiwsDed8Wxf1o`,
      accounts: []
    }
  }
};

// payer = "0x4D1f7538f9d629C8204D674832c515CbF26e9C8" // account 2
// payee = "0x5e87eE4F9f21525a86FBD521140000Fde73637B3" account 3