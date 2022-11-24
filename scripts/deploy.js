const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");


task("check-balance", "Prints out the balance of your account").setAction(async function (taskArguments, hre) {
    const account = getAccount();
    console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the MotobloqToken contract").setAction(async function (taskArguments, hre) {
    const MotobloqToken = await hre.ethers.getContractFactory("MotobloqToken", getAccount());
    // calling deploy() will return an async Promise that we can await on
    const instance = await MotobloqToken.deploy(
        "0x00870AF6D4F8744626d186cc835C96B1bAA574e9",
        500
    );

    console.log(`Contract deployed to address: ${instance.address}`);
});