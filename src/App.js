import './App.css';

import React, {useEffect, useState} from "react";
import {connectWallet, checkAvailability, mintNFT, getMintPrice, getNumberOfMintedNfts} from "./interact/wallet/wallet";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image'
import pepe from './images/pepe.svg';
import SpeechBubble from './SpeechBubble';
import {Alert} from "react-bootstrap";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [ownerAddress, setOwnerAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [isValidText1, setIsValidText1] = useState(false);
    const [isValidText2, setIsValidText2] = useState(false);
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [textInput1, setTextInput1] = useState("");
    const [textInput2, setTextInput2] = useState("");
    const [txHash, setTxHash] = useState("");
    const [nrOfMintedNfts, setNrOfMintedNfts] = useState(0);
    const [mintPrice, setMintPrice] = useState(0);

    useEffect(() => {

        getNumberOfMintedNfts().then((nrOfNfts) => {
            setNrOfMintedNfts(nrOfNfts);
        });

        getMintPrice().then((mintPrice) => {
            setMintPrice((Number(mintPrice)).toString());
        });
    });

    const MINUTE_MS = 10000;

    useEffect(() => {
    const interval = setInterval(() => {

        getNumberOfMintedNfts().then((nrOfNfts) => {
            setNrOfMintedNfts(nrOfNfts);
        });

        getMintPrice().then((mintPrice) => {
            setMintPrice((Number(mintPrice)).toString());
        });
        
    }, MINUTE_MS);

    return () => clearInterval(interval); 
    }, [])

    const handleCheckAvailability = () => {

        let text1Good = false;
        let text2Good = false;

        ({ text1Good, text2Good } = validateInputs(text1Good, text2Good));

        if(text1Good && text2Good){
            checkAvailability(textInput1, textInput2).then((isAvailable) => {                

                if(isAvailable){
                    setIsValidText1(false);
                    setIsValidText2(false);
                    setInputErrorMessage("Text combination already taken");
                }

                return isAvailable;
              });      
        }

        return true;
    };

    const handleMint = () => {

        let isAvailable = handleCheckAvailability();        
        if(isAvailable){

            getMintPrice().then((mintPrice) => {
                mintNFT(textInput1, textInput2, (Number(mintPrice)).toString(), setTxHash, setIsLoading)      
            });
        }
    };

    const handleConnectWallet = () => {
        connectWallet()
            .then((response) => {
                setOwnerAddress(response)
                setIsLoading(false)
                setIsConnected(true)

            })
            .catch(() => {
                setErrorMessage("Unable to connect to wallet");
            });
    };

    useEffect(() => {
        async function fetchChangedAddress() {
            if (window.ethereum) {
                window.ethereum.on("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        setOwnerAddress(accounts[0]);

                    }
                });
            }
        }

        fetchChangedAddress().then()
    });

    return (
        <div className="App">

            <NavBar walletAddress={ownerAddress} handleConnectWallet={handleConnectWallet} isConnected={isConnected}></NavBar>

            {isConnected ? <Navbar bg="dark" variant="dark" >
                    <Container className="justify-content-center">


                    </Container>
                </Navbar>
                : ""}


            <div className='rowC'>
                <div>
                    <Image width={700} height={700}  fluid alt='...' src={pepe} />
                    <p className='mintedText'>Total minted: {nrOfMintedNfts}</p>
                </div>
                
                <SpeechBubble validated={validated}
                    setValidated={setValidated}
                    isValidText1={isValidText1}
                    setIsValidText1={setIsValidText1}
                    isValidText2={isValidText2}
                    setIsValidText2={setIsValidText2}
                    handleCheckAvailability={handleCheckAvailability}
                    isLoading={isLoading}
                    handleMint={handleMint}
                    setTextInput1={setTextInput1}
                    setTextInput2={setTextInput2}
                    inputErrorMessage={inputErrorMessage}
                    setInputErrorMessage={setInputErrorMessage}
                    mintPrice={mintPrice}
                ></SpeechBubble>
            </div>
          
            {txHash !== "" &&  <Alert variant='dark' onClose={() => setTxHash("")} dismissible>
                Minted - txHash: <a href={'https://etherscan.io/tx/' + txHash} >{txHash}</a>
                </Alert>}            
        </div>

    );

    function validateInputs(text1Good, text2Good) {
        setValidated(true);
        if (textInput1 === "") {
            setIsValidText1(false);
            setInputErrorMessage("Text1 cannot be empty");
        }
        else if (textInput1.endsWith(' ') || textInput1.startsWith(' ')) {
            setIsValidText1(false);
            setInputErrorMessage("Text starts or ends with space");
        }
        else {
            text1Good = true;
            setIsValidText1(true);
        }
        if (textInput2 !== "" && (textInput2.endsWith(' ') || textInput2.startsWith(' '))) {
            setIsValidText2(false);
            setInputErrorMessage("Text starts or ends with space");
        }
        else {
            text2Good = true;
            setIsValidText2(true);
        }
        return { text1Good, text2Good };
    }
}

export default App;
