import './App.css';

import React, {useEffect, useState} from "react";
import {connectWallet} from "./interact/wallet/wallet";
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

    const [modalShow, setModalShow] = useState(false);

    const handleCheckAvailability = (event) => {
     
    //    let form = event.currentTarget
        //if (form.checkValidity() === false) {
       //   event.preventDefault();
       //  event.stopPropagation();
       
     //   }

        //Call method and check if available
    
        setValidated(true);
        setIsValidText1(true);
    };

    const handleMint = (event) => {
     
        //Check if text1 is length over 0. 
        //Then mint

      //  let form = event.currentTarget
      //  if (form.checkValidity() === false) {
       //   event.preventDefault();
       //  event.stopPropagation();
       
    //    }
    
        setValidated(true);
        setIsValidText1(true);
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
                <SpeechBubble validated={validated} setValidated={setValidated} isValidText1={isValidText1} setIsValidText1={setIsValidText1} handleCheckAvailability={handleCheckAvailability} isLoading={isLoading} handleMint={handleMint}></SpeechBubble>
            </div>

        </div>

    );
}

export default App;
