const hre = require("hardhat");

async function main() {

    const Task = await hre.ethers.getContractFactory("Task");
    const task = await Task.deploy("0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3");

    await task.deployed();

    console.log("Greeter deployed to:", task.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});