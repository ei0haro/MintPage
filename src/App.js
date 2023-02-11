import './App.css';

import React, {useEffect, useState} from "react";
import {connectWallet} from "./interact/wallet/wallet";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import Main from "./Main";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
    
    const [isConnected, setIsConnected] = useState(false);
    const [ownerAddress, setOwnerAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");


    const handleConnectWallet = () => {
        connectWallet()
            .then((response) => {
                setOwnerAddress(response)                
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

            <Main/>
                      
        </div>

    );

}

export default App;
