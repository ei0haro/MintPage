
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3('https://eth-mainnet.g.alchemy.com/v2/' + process.env.REACT_APP_ALCHEMY_KEY);
const contractABI = require('../../abi/contractAbi.json')

export const connectWallet = async () => {

    const chainId = 1 // ETH mainnet

    if (window.ethereum.networkVersion !== chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }]
            });
        } catch (err) {

        }

        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            return addressArray[0];
        } catch (err) {
            return '';
        }
    }
};

export const getNumberOfMintedNfts = async () => {
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_CONTRACT_ADDRESS);
    return await window.contract.methods.getNumberOfMintedNfts().call()
  }
  
  export const getmaxSupply = async () => {
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_CONTRACT_ADDRESS);
    return await window.contract.methods.getmaxSupply().call()
  }
  
  export const mintNFT = async () => {
  
    window.contract = await new web3.eth.Contract(contractABI, process.env.REACT_APP_CONTRACT_ADDRESS);
  
    const transactionParameters = {
      to: process.env.REACT_APP_CONTRACT_ADDRESS, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
          .safeMint()
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
  

