import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import DarkButton from "./interact/button/button";
import React from "react";
import {Nav} from "react-bootstrap";
import "./interact/button/button.css";

function NavBar({walletAddress, handleConnectWallet, isConnected}) {

    function setConnectButtonText(wallet) {
        if (wallet.startsWith("0x")) {
            return wallet.substring(0, 5) + "..." + wallet.substring(wallet.length - 4)
        } else if (wallet === '') {
            return "Connect wallet"
        } else {
            return wallet
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>

                    <Navbar.Brand href="#home">
                        On Chain Talking Pepe
                    </Navbar.Brand>
                    {isConnected ? <Nav>
                        <Container className="justify-content-center">               
                        </Container>
                        </Nav>
                        : ""
                    }
                    <DarkButton size={'lg'} onClickFunction={handleConnectWallet} disableIf={false}
                                text={setConnectButtonText(walletAddress)}></DarkButton>

                </Container>
            </Navbar>
            <Navbar bg="dark" variant="dark">
                <Container>

                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;
