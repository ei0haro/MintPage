import './App.css';

import React, {useEffect, useState} from "react";
import {connectWallet, checkAvailability, mintNFT, getMintPrice} from "./interact/wallet/wallet";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import DarkButton from "./interact/button/button";
import Cookies from 'universal-cookie';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import DonateCard from "./DonateCard";
import Image from 'react-bootstrap/Image'
import pepe from './images/pepe.svg';
import SpeechBubble from './SpeechBubble';

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

    const [modalShow, setModalShow] = useState(false);

    const handleCheckAvailability = () => {

        let text1Good = false;
        let text2Good = false;

        ({ text1Good, text2Good } = validateInputs(text1Good, text2Good));

        if(text1Good && text2Good){
            checkAvailability(textInput1, textInput2).then((response) => {
                console.log(`Received response: ${response}`);
              });

      
        }
    };

    const handleMint = () => {

        let text1Good = false;
        let text2Good = false;

        ({ text1Good, text2Good } = validateInputs(text1Good, text2Good));

        if(text1Good && text2Good){

            getMintPrice().then((mintPrice) => {
                console.log(Number(mintPrice)/1000)

                mintNFT(textInput1, textInput2, (Number(mintPrice)/1000).toString()).then((txHash) => {
                    console.log(`TxHash: ${txHash}`);

                });
                
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
                <Image width={1000} height={1000}  fluid alt='...' src={pepe} />
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
                ></SpeechBubble>
            </div>

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
