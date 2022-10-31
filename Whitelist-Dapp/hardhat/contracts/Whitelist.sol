// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract Whitelist {
    uint256 public immutable maxWhitelistedAddresses;
    mapping(address => bool) public whitelistedAddresses;
    uint256 public numAddressesWhitelisted;
    
    constructor(uint256 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddresses[msg.sender], "Already whitelisted");
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "Limit reached, Thanks for your interest");
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted = numAddressesWhitelisted + 1;
    }
}