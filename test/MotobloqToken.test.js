const { expect } = require("chai");


describe("MotobloqToken", function() {

    let motobloqToken;
    let accounts;
    let royaltyReceiver;
    let feeNumerator;

    beforeEach(async function() {
        accounts = await ethers.getSigners();
        royaltyReceiver = accounts[0].address;
        feeNumerator = 10;
        motobloqToken = await (await ethers.getContractFactory("MotobloqToken")).deploy(royaltyReceiver, feeNumerator);
        await motobloqToken.deployed();
    });

    it("Should return the right name and symbol", async function() {
        expect(await motobloqToken.name()).to.equal("MotobloqToken");
        expect(await motobloqToken.symbol()).to.equal("MBT");
    });

    it("Should mint a new token", async function() {
        const initialOwner = accounts[0];
        const tokenId = 1;
        const tokenURI = "https://token.com/1";

        await motobloqToken.connect(initialOwner).mint(initialOwner.address, tokenId, tokenURI);

        expect(await motobloqToken.ownerOf(tokenId)).to.equal(initialOwner.address);
        expect(await motobloqToken.tokenURI(tokenId)).to.equal(tokenURI);
    });

    it("Should change token URI", async function() {
        const initialOwner = accounts[0];
        const tokenId = 1;
        const tokenURI = "https://token.com/1";
        const newTokenURI = "https://newtoken.com/1";

        await motobloqToken.connect(initialOwner).mint(initialOwner.address, tokenId, tokenURI);
        await motobloqToken.connect(initialOwner).setTokenURI(tokenId, newTokenURI);

        expect(await motobloqToken.tokenURI(tokenId)).to.equal(newTokenURI);
    });

    it("Only admin can change token URI", async function() {
        const initialOwner = accounts[0];
        const someoneElse = accounts[1];
        const tokenId = 1;
        const tokenURI = "https://token.com/1";
        const newTokenURI = "https://newtoken.com/1";

        await motobloqToken.connect(initialOwner).mint(initialOwner.address, tokenId, tokenURI);

        await expect(motobloqToken.connect(someoneElse).setTokenURI(tokenId, newTokenURI))
            .to.be.revertedWith('MotobloqToken: must have admin role to set token URI');
    });

    it('Only allows minter to mint', async function () {
        const someoneElse = accounts[1];
        const tokenId = 1;

        await expect(motobloqToken.connect(someoneElse).mint(someoneElse.address, tokenId, "https://token.com/1"))
            .to.be.revertedWith('ERC721MinterBurnerPauser: must have minter role to mint');
    });

    it("Should not burn a non-existing token", async function() {
        const initialOwner = accounts[0];
        const tokenId = 1;

        await motobloqToken.connect(initialOwner).mint(initialOwner.address, tokenId, "https://token.com/1");
        await motobloqToken.connect(initialOwner).burn(tokenId);

        await expect(motobloqToken.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
    });

    it("Should pause and unpause the contract", async function() {
        const admin = accounts[0];

        await motobloqToken.connect(admin).pause();
        expect(await motobloqToken.paused()).to.equal(true);

        await motobloqToken.connect(admin).unpause();
        expect(await motobloqToken.paused()).to.equal(false);
    });

    it('Only allows pauser to pause', async function () {
        const nonAdmin = accounts[1];
        await expect(motobloqToken.connect(nonAdmin).pause()).to.be.revertedWith('ERC721MinterBurnerPauser: must have pauser role to pause');
    });

    it('Only allows pauser to unpause', async function () {
        const nonAdmin = accounts[1];
        await expect(motobloqToken.connect(nonAdmin).unpause()).to.be.revertedWith('ERC721MinterBurnerPauser: must have pauser role to unpause');
    });

    it("Should support ERC165 interface", async function() {
        expect(await motobloqToken.supportsInterface("0x01ffc9a7")).to.equal(true); // ERC165 interface ID
    });

    it("Should support ERC721 interface", async function() {
        expect(await motobloqToken.supportsInterface("0x80ac58cd")).to.equal(true); // ERC721 interface ID
    });

    it("Should support ERC721 metadata interface", async function() {
        expect(await motobloqToken.supportsInterface("0x5b5e139f")).to.equal(true); // ERC721Metadata interface ID
    });

    it("Should support ERC2981 interface", async function() {
        expect(await motobloqToken.supportsInterface("0x2a55205a")).to.equal(true); // ERC2981 interface ID
    });

    it("Should not support random interface", async function() {
        expect(await motobloqToken.supportsInterface("0x12345678")).to.equal(false); // Random interface ID
    });
});