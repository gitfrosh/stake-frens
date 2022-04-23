const hre = require("hardhat");

async function main() {

    const Task = await hre.ethers.getContractFactory("Task");
    const task = await Task.deploy();

    await task.deployed();

    console.log("Greeter deployed to:", task.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});