const { task } = require("hardhat/config");
const { getContract } = require("./helpers");

task("mint", "Mints from the Motobloq Token contract")
    .addParam("address", "The address to receive a token")
    .addParam("tokenId", "The token id to mint")
    .addParam("tokenUri", "The token uri to mint")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContract("MotobloqToken", hre);
        const transactionResponse = await contract.mint(
            taskArguments.address,
            taskArguments.tokenId,
            taskArguments.tokenUri,
            {
            gasLimit: 500_000,
        });
        console.log(`Transaction Hash: ${transactionResponse.hash}`);
    });


task("token-uri", "Fetches the token metadata for the given token ID")
    .addParam("tokenId", "The tokenID to fetch metadata for")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContract("MotobloqToken", hre);
        const response = await contract.tokenURI(taskArguments.tokenId, {
            gasLimit: 500_000,
        });

        const metadata_url = response;
        console.log(`Metadata URL: ${metadata_url}`);

        const cid = metadata_url.split('ipfs://').pop();
        const gateway_url = "https://ipfs.io/ipfs/" + cid;

        const metadata = await fetch(gateway_url).then(res => res.json());
        console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
    });