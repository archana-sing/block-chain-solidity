// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  const Crud = await hre.ethers.getContractFactory("CRUD");
  const crud = await Crud.deploy();

  await crud.deployed();
  // to craete employee
  const response1 = await crud.create("archana", "archana@gmail.com", 21, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const response2 = await crud.create("aashi", "aashi@gmail.com", 25, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const response3 = await crud.create("akshat", "akshat@gmail.com", 29, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  // to read employees
  const emp1 = await crud.employees(0);
  // to update
  const updateResponse = await crud.updateEmployee("abhishek", "archana@gmail.com");
  const emp2 = await crud.employees(0);
  const delteRes = await crud.deleteEmployee("archana@gmail.com");
  const emp3 = await crud.employees(1);
  console.log(
    emp2, emp3
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
