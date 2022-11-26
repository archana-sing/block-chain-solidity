// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [owners1, owners2, owners3, recipient1] = await hre.ethers.getSigners();
  const threshold = 2;
  const Wallet = await hre.ethers.getContractFactory("MultiSignerWallet");
  const wallet = await Wallet.deploy([owners1.address, owners2.address, owners3.address], threshold);

  await wallet.deployed();
  await wallet.deposit({value: 2});
  const contractBalance = await hre.ethers.provider.getBalance(wallet.address);
  console.log(contractBalance);
  const addressesOfOwners = await wallet.getOwners();

  const transfer = await wallet.createTransfer(1, recipient1.address);
  await transfer.wait();

  const transfers = await wallet.getTransfers();

  const approver1 = await wallet.connect(owners1).approveTransfer(0);
  await approver1.wait();
  const approver2 = await wallet.connect(owners2).approveTransfer(0);
  await approver2.wait();
  const transfersAfterApproval = await wallet.getTransfers();
  console.log( transfersAfterApproval);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
