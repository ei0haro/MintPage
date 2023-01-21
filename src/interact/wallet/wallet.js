require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { ethers } = require("ethers");
console.log("SDDS"+process.env.REACT_APP_RPC)
const web3 = createAlchemyWeb3(process.env.REACT_APP_RPC);
const contractABI = require('../../abi/contractAbi.json')
//import {ethers} from "ethers";

export const connectWallet = async () => {

    const chainId = process.env.REACT_APP_CHAIN_ID;

   /* if (window.ethereum.networkVersion !== chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }]
            });
        } catch (err) {

        }


    } */

    try {
      const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
      });
      return addressArray[0];
  } catch (err) {
      return '';
  }
};

export const getNumberOfMintedNfts = async () => {
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_NFT_CONTRACT);
    return await window.contract.methods.getNumberOfMintedNfts().call()
  }
  
  export const getmaxSupply = async () => {
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_NFT_CONTRACT);
    return await window.contract.methods.getmaxSupply().call()
  }

  export const getMintPrice = async () => {
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_NFT_CONTRACT);
    return await window.contract.methods.mintPrice().call()
  }
 

  export const checkAvailability = async (text1, text2) => {

    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_NFT_CONTRACT);
    return await window.contract.methods.exists(text1, text2).call()
  }
  
  export const mintNFT = async (text1, text2, mintPrice, setTxHash, setIsLoading) => {
  
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_NFT_CONTRACT);  

    console.log(ethers.utils.parseEther("0.05").toString())

    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        provider.getSigner().sendTransaction({
          value: mintPrice,
          to: process.env.REACT_APP_NFT_CONTRACT, // Required except during contract publications.
          from: window.ethereum.selectedAddress, // must match user's active address.
          data: window.contract.methods
              .mint(text1, text2)
            .encodeABI(),
        }).then((txHash) => {
          setTxHash(txHash.hash);


      /*  const interval = setInterval(function() {
          console.log("Attempting to get transaction receipt...");
          web3.eth.getTransactionReceipt(txHash.hash, function(err, rec) {
            if (rec) {
              console.log(rec);
              clearInterval(interval);
            }
          });
        })
*/
        })
      }
      catch (error) {
        return 'Something went wrong' + error;
      }
  };


  

