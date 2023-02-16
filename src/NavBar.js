import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import DarkButton from "./interact/button/button";
import React from "react";
import {Nav, Image} from "react-bootstrap";
import "./interact/button/button.css";
import "./NavBar.css";
import etherscanImage from './images/Etherscan.svg';
import openseaImage from './images/opensea.png';
import twitterImage from './images/twitter.png';

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
                    <Navbar.Brand >
                    <a href={"https://etherscan.io/token/" + process.env.REACT_APP_NFT_CONTRACT}><Image width={30} height={30} thumbnail={true} src={etherscanImage}></Image></a>
                    {' '}
                    <a href={"https://opensea.io/collection/onchaintalkingpepe"}><Image width={30} height={30} thumbnail={true} src={openseaImage}></Image></a>
                        {' '}
                    <a href={"https://twitter.com/OnChainPepe"}><Image width={30} height={30} thumbnail={true} src={twitterImage}></Image></a>
                    {' '}
                    <a id="navbarText" className={"linkcolor"} href={"/"}>On Chain Talking Pepe</a>
                    {' '}
                        
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
