
import React from "react";
import "./SpeechBubble.css";
import "./DonateCard.css";
import DarkButton from "./interact/button/button";
import {Form} from "react-bootstrap";
import {ethers} from "ethers";

function SpeechBubble({validated, setValidated, isValidText1, setIsValidText1, isValidText2, setIsValidText2,
     handleCheckAvailability, handleMint, isLoading, setTextInput1, setTextInput2,
    inputErrorMessage, setInputErrorMessage, mintPrice}) {

    function handleInputChange1(e) {
        let text = e.target.value

        if(text.endsWith(' ') || text.startsWith(' ')){
            setValidated(true);
            setIsValidText1(false);
            setInputErrorMessage("Cannot start or end with white space");
        }
        else{
            setIsValidText1(true);
            setValidated(false);
        }

        setTextInput1(text);
    }

    function handleInputChange2(e) {

        let text = e.target.value

        if(text.endsWith(' ') || text.startsWith(' ')){
            setValidated(true);
            setIsValidText2(false);
            setInputErrorMessage("Cannot start or end with white space");
        }
        else{
            setIsValidText2(true);
            setValidated(false);
        }

        setTextInput2(text);
    }


    return (
        <div className="box">

                        
                        <Form >
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        size="sm"                                
                                        placeholder="Text1"    
                                        onChange={handleInputChange1}                                        
                                        required     
                                        type="text"
                                        maxLength={10}                                        
                                        {...(isValidText1 && validated ? {className:"is-valid"} : {})}
                                        {...(!isValidText1 && validated ? {className:"is-invalid"} : {})}                                                          
                                    />                                    
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        size="sm"    
                                        variant="dark"                            
                                        placeholder="Text2"                                        
                                        type="text"
                                        maxLength={10}
                                        onChange={handleInputChange2}
                                        {...(isValidText2 && validated ? {className:"is-valid"} : {})}
                                        {...(!isValidText2 && validated ? {className:"is-invalid"} : {})}                                          
                                    />
                                    <Form.Control.Feedback type="invalid">{inputErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <div className='rowC'>
                                <DarkButton size={'lm'} onClickFunction={handleCheckAvailability} disableIf={isLoading} text={isLoading ? 'Loading…' : 'Check availability'}></DarkButton>
                                <DarkButton size={'lm'} onClickFunction={handleMint} disableIf={isLoading} text={isLoading ? 'Loading…' : `Mint (${ethers.utils.formatEther(mintPrice)} ETH)`}></DarkButton>
                                </div>
                            </Form>



	    </div>
    );
}

export default SpeechBubble;
