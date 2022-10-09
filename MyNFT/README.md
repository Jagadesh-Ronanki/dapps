## Build own NFT using ERC-721

Reference: [learnweb3.io](https://learnweb3.io/courses/9a3fafe4-b5eb-4329-bdef-97b2aa6aacc1/lessons/017e65bf-2a86-455e-a499-09b61ffa5241)

#### Outcomes:

* Contract deployment using **QuickNode** (a Web3 infrastructure platform, helping developers & businesses build, launch, and scale dapps).
* Deploying Smart Contracts using hardhat.

## Workflow to remember

#### Setup

Create a directory
initialize it with node package
install hardhat
using npx hardhat
create a javascript-project

```bash
mkdir NFT
cd  NFT
npm init --yes
npm install --save-dev hardhat
```

#### Write Contract

install @openzeppelin/contracts
```bash
npm install @openzeppelin/contracts
```
write a simple contract that uses ERC721 to mint nft to our address
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the openzepplin contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// GameItem is  ERC721 signifies that the contract we are creating imports ERC721 and follows ERC721 contract from openzeppelin
contract GameItem is ERC721 {

    constructor() ERC721("GameItem", "ITM") {
        // mint an NFT to yourself
        _mint(msg.sender, 1);
    }
}
```

#### Compile
compile the contract using
```bash
npx hardhat compile
```

#### Configure Deployment
configure deploy.js with goerli test network

create **.env** file to prevent attackers from stealing sensitive information.

```
QUICKNODE_HTTP_URL="add-quicknode-http-provider-url-here"
PRIVATE_KEY="add-the-private-key-here"
```

add these to .env file

Now we would install dotenv package to be able to import the env file and use it in our config.

```bash
npm install dotenv
```

Open the `hardhat.config.js` file, we would add the `goerli` network here so that we can deploy our contract to the Goerli network.

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
```

#### Deploy
```bash
npx hardhat run scripts/deploy.js --network goerli
```

Save the NFT Contract Address that was printed on your terminal to your .env file as `CONTRACT_ADDRESS = <nft address>`

Finally created our own nft 😉🐨.

---

Contact me [@twitter](https://twitter.com/JagadeshRonanki)