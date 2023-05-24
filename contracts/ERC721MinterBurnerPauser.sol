// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity 0.8.17;

// This is adapted from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/presets/ERC721PresetMinterPauserAutoId.sol

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ERC721MinterBurnerPauser is
    AccessControl,
    ERC721Burnable,
    ERC721Pausable,
    ERC721URIStorage
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    string public baseURI;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE` and `MINTER_ROLE`to the account that
     * deploys the contract.
     *
     * Token URIs will be autogenerated based on `baseURI` and their token IDs.
     * See {ERC721-tokenURI}.
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI_
    ) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
        _grantRole(PAUSER_ROLE, _msgSender());

        _setBaseURI(baseURI_);
    }

    /**
     * @dev Creates a new token for `to`. Its token ID will be automatically
     * assigned (and available on the emitted {Transfer} event), and the token
     * URI autogenerated based on the base URI passed at construction.
     *
     * See {ERC721-_safeMint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(
        address to,
        uint256 tokenId,
        string memory _data
    ) external {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC721MinterBurnerPauser: must have minter role to mint"
        );

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _data);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() external {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "ERC721MinterBurnerPauser: must have pauser role to pause"
        );
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC721Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() external {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "ERC721MinterBurnerPauser: must have pauser role to unpause"
        );
        _unpause();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, batchSize, tokenId);
    }

    function _setBaseURI(string memory baseURI_) internal {
        baseURI = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
