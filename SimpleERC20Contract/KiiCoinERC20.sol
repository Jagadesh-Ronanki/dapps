// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract KiiCoinERC20 {
    Transfer(address indexed from, address indexed to, uint tokens);
    eventApproval(address indexed tokenOwner, address indexed spender, uint tokens);

    string public constant name = "Kitty Coin";
    string public constant symbol = "kii";
    uint8 public constant decimals = 18;

    mapping(address => uint256) balances;
    mapping(address => (address => uint256)) allowed;

    uint256 totalSupply;

    constructor(uint256 _total) {
        totalSupply = _total;
        balances[msg.sender] = totalSupply;
    }

    // acquiring owner balance
    function balanceOf(address tokenOwner) public view returns(uint) {
        return balances[tokenOwner];
    }

    // transfer tokens to desired account
    function transfer(address receiver, uint numTokens) {
        require(balance[msg.sender] >= numTokens);
        balances[msg.sender] -= numTokens;
        balances[receiver] += numTokens;

        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    // sanctioning a token
    function approve(addresss delegate, uint numTokens) public returns(bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);

        return true;
    }

    // acquiring the allowance status of desired account
    function allowance(address owner, address delegate) public view returns(uint) {
        return allowed[owner][delegate];
    }

    // transfer from one account to other
    function transferFrom(address owner, address buyer, uint numTokens) public returns(bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] -= numTokens;
        allowed[owner][msg.sender] == numTokens;
        balances[buyer] += numTokens;
        emit Transfer(owner, buyer, numTokens);
        return True;        
    }
}