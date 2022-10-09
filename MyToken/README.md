## Build your own cryptocurrency using ERC-20 tokens

**Refer:** [LearnWeb3DAO's](https://learnweb3.io/) Freshman Course to build your first token.

#### What are tokens?
Tokens are digital assets defined by a project or smart contract and built on a specific blockchain.

> Utility Tokens help fund ICOs and create an internal economy within the project's blockchain

> Security Tokens is an investment contract representing the legal ownership of a physical or digital asset that has been verified within the blockchain.

#### What is ERC-20?

**ERC** (Ethereum Request for Comment) are the standards that are approved by the community and are used to convey technical requirements and specifications for certain use cases.

**ERC-20** specifically is a standard which outlines the technical specification of a _fungible token_.

**Fungible token** is the token whose value is same at all time.
All fiat currency are examples of fungible tokens. Dollor for a dollor remains same everywhere.

---

[MyCoin.sol](./MyCoin.sol) is a simple contract that extends ERC-20 and create our own crypto token (my contract was deployed in Ethereum Goerli Testnet)

The version of solidity used
```solidity
pragma solidity 0.8.17;
```

The contract for standard erc's need not be written from scratch in your contract. Just import it from OpenZeppelin. It provides all standard contracts. We import **ERC20.sol** to develop our own crypto token. 
```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

A contract with name `MyCoin` which extends `ERC20` i.e., we can use all the methods of ERC20 contract from MyCoin contract.
```solidity
contract MyCoin is ERC20 {
    ...
}
```

Constructor is the special method which is invoked only once during the deployment of contract. Here we pass 2 arguments `name eg:ether` and `symbol eg:eth`.
```solidity
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 10 * 10 ** 18);
    }
```

 `ERC20(_name, _symbol)` immediate after constructor call is to invoke the erc20 contract constructor with name and symbol.

 `_mint` method mints tokens (of possibly lowest units) to the address specified. 
