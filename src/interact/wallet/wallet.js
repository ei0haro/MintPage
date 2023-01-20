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
  
  export const mintNFT = async (text1, text2, mintPrice) => {
  
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_NFT_CONTRACT);  

    const transactionParameters = {
      value: mintPrice,
      to: process.env.REACT_APP_NFT_CONTRACT, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
          .mint(text1, text2)
        .encodeABI(),
    };
  
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return txHash;
    } catch (error) {
      return '';
    }
  };
  

