import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Web3Modal from 'web3modal';
import { providers, Contract}  from 'ethers';
import { useEffect, useRef, useState } from 'react'; 
import { WHITELIST_CONTRACT_ADDRESS, abi} from '../constants'


export default function Home() {
  // check if the users wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);

  // check if the current connected address has joined the whitelist or not
  const[joinedWhitelist, setJoinedWhiteList] = useState(false);

  // Loading.... while the user wiats for the transaction to be mined
  const [loading, setLoading] = useState(false);

  // numOfWhiteListed used too track the number of whitelisted addresses
  const [numOfWhitelisted, setNumberOfWhitelisted] = useState(0);

  // a reference to the Web3Modal
  const web3ModalRef = useRef();

  // @dev returns Provider or Signer

  const getProviderOrSigner = async(needSigner = false) => {
    // connect to metamask wallet
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);

  // if a user is not connected to the Goerli network, let them know and throw up an error
  const { chainId } = await web3Provider.getNetwork();
  if(chainId!== 5){
  window.alert("Change the network to Goerli");
  throw new Error("Change the network to Goerli");
  }

  if (needSigner){
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;

  }

  // addAddressToWhiteList - adds the currently connected address to the whitelist
  const addAddressToWhitelist = async () => {
    try {
      // get the signer from the connected wallet
      const signer = await getProviderOrSigner(true);

      // create a new instance of the contract with a signer
      
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      
      // call the addAddressToWhitelist from the contract
      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);

      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // call the numAddressesWhitelisted 
      const _numAddressesWhitelisted  = await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numAddressesWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumOfWhitelisted = async ()=> {
    try{
      // get a provider since it is not a write transaction
      const provider = await getProviderOrSigner();

      // instantiate the contract with a provider
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      )
      const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    }catch(err){
      console.error(err);
    }
  }

  //checkIfAddressInWhitelist - chack if the address is in whitelist

  const checkIfAddressInWhitelist = async ()=>{
  try {    
    // fetch the signer
    const signer = await getProviderOrSigner(true);
    // instantaite the contract with a signer
    const whitelistContract = new Contract(
      WHITELIST_CONTRACT_ADDRESS,
      abi,
      signer
    );
 
    // get the address associated with the signer
    const address = await signer.getAddress();

    // call whitelistedAddresses from the contract
    const _joinWhitelist = await whitelistContract.whitelistedAddresses(
      address
    );
    setJoinedWhiteList(_joinWhitelist);}

    catch (err){
    console.error(err);
    }
  }

  // connect metamask wallet
  const connectWallet = async ()=>{
    try{
      //fetch the the provider form the web3Modal
      // prompts user to connect wallet when the used for the first time
      await getProviderOrSigner();
      setWalletConnected(true);

      checkIfAddressInWhitelist();
      getNumOfWhitelisted();
    } catch(err){
      console.error(err);
    }
  }

  // render button:- return a button based on the state of the dapp
  const renderButton = ()=>{
    if(walletConnected){
      if(joinedWhitelist){
        return(
          <div className = {styles.description}> Thanks for joining the whitelist!</div>
        )
      } else if (loading){
        return(
          <div className={styles.button}> Loading...</div>
        )
      } else {
        return (
          <button onClick={addAddressToWhitelist} className = {styles.button}> Join the whitelist</button>
        )
      } 
    }else {
      return(
        <button onClick={ connectWallet} className = { styles.button}>
          Connect your Wallet
        </button>
      )
    }
  }
// change the state of the dapp whenever the state of the website changes
useEffect(()=>{
  if (!walletConnected){
    web3ModalRef.current = new Web3Modal({
      network: "goerli",
      providerOptions:{},
      disabledInjectedProvider: false,
    });
    connectWallet();
  }
}, [walletConnected]);

  return (
    <div >
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Dev!</h1>
          <div className={styles.description}>
            It is an NFT collection for developers in Crypto.
          </div>
          {/* <div>
             // error
          </div> */}
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src= "./crypto-devs.svg"/>
        </div>
      </div>
      <footer className={styles.footer}>
        Made with &#10084; by Jagadesh
      </footer>
    </div>
  );
}