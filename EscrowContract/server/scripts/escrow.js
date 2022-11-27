// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    //   const [lawyer, payer, payee, recipient1] = await hre.ethers.getSigners();
    // during test network, we get lawyer by adding private key in goerli setting
    const [lawyer] = await hre.ethers.getSigners();
    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy("0x4D1f7538f9d629C8204D674832c515CbF26e9C81", "0x5e87eE4F9f21525a86FBD521140000Fde73637B3", 10000);
    console.log(escrow);
    await escrow.deployed();

    // await escrow.connect(payer).deposit({ value: 10000 });
    // const payeeBalance1 = await hre.ethers.provider.getBalance(payee.address);
    // await escrow.connect(payee).submitWork();
    // await escrow.connect(lawyer).release();
    // const contractBalance = await hre.ethers.provider.getBalance(escrow.address);
    // const payeeBalance = await hre.ethers.provider.getBalance(payee.address);
    // console.log(contractBalance, 'contract balance');


    console.log(
        escrow.address
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
