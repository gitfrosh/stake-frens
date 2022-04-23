
const hre = require("hardhat");

async function main() {

  const Task = await hre.ethers.getContractFactory("Task");
  const task = await Task.deploy("0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6");

  await task.deployed();

  console.log("Greeter deployed to:", task.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
