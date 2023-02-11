import React, {useEffect, useState} from "react";
import TextBubbleSvg from "./TextBubbleSvg"
import Image from 'react-bootstrap/Image'
import pepe from '../images/pepe-green.svg';
import SpeechBubble from './SpeechBubble';
import {Alert} from "react-bootstrap";
import './Home.css';
import Card from "react-bootstrap/Card";
import {checkAvailability, mintNFT, getMintPrice, getNumberOfMintedNfts} from "../interact/wallet/wallet";

function Home(){
    
    const [isLoading, setIsLoading] = useState(false);
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

    return(
        <div>
            <div className='homeGrid'>
                    <div>
                        <Image width={700} height={700}  fluid alt='...' src={pepe} />
                        <p className='mintedText'>Total minted: {nrOfMintedNfts}</p>
                    </div>
                    <div>
                    <Card style={{ width: '15rem' }} bg="black">
                        <TextBubbleSvg text1={textInput1} text2={textInput2}></TextBubbleSvg>                    
                        <Card.Body >           
                        
                        <Card.Text>
                            This is how your provided text will look like in the minted NFT. If the text does not fit, please use small caps.
                        </Card.Text>                    
                        </Card.Body>
                    </Card>
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
    )
}

export default Home;