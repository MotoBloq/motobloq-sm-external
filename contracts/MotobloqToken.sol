// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./ERC721MinterBurnerPauser.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract MotobloqToken is ERC721MinterBurnerPauser, ERC2981 {


    event TokenURIChange(uint256 indexed tokenId, string tokenURI);

    constructor(address royaltyReceiver, uint96 feeNumerator)
        ERC721MinterBurnerPauser("MotobloqToken", "MBT", "")
    {
        _setDefaultRoyalty(royaltyReceiver, feeNumerator);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721MinterBurnerPauser, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {ERC721-_burn}. This override additionally clears the royalty information for the token.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);
        _resetTokenRoyalty(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "MotobloqToken: must have admin role to set token URI"
        );

        _setTokenURI(tokenId, _tokenURI);

        emit TokenURIChange(tokenId, _tokenURI);
    }
}
