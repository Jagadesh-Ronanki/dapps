// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract JrItem is ERC721 {
    constructor() ERC721("JrItem", "Jr") {
        _mint(msg.sender, 1);
    }
}