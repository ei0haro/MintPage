
import React from "react";
import "./SpeechBubble.css";
import DarkButton from "./interact/button/button";
import {Form, Button} from "react-bootstrap";

function SpeechBubble({validated, setValidated, isValidText1, setIsValidText1, handleCheckAvailability, handleMint, isLoading}) {

    function handleInputChange1(e) {
        setValidated(false);
      /*  let textInput = e.target.value

        if(textInput.length === 0){
            setValidated(true);
            setIsValidText1(false);
        }
        */
    }

    function handleInputChange2(e) {
        setValidated(false);
    }


    return (
        <div class="box">
            <div class="center">
                <div class="dialog-1">
                    <div class="form-dialog">
                        
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
                                    <Form.Control.Feedback type="invalid">Please provide between 1 - 10 characters.</Form.Control.Feedback>
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        size="sm"                                
                                        placeholder="Text2"                                        
                                        type="text"
                                        maxLength={10}
                                        onChange={handleInputChange2}                                        
                                    />
                                </Form.Group>
                                <div className='rowC'>
                                <DarkButton size={'lm'} onClickFunction={handleCheckAvailability} disableIf={isLoading} text={isLoading ? 'Loading…' : 'Check availability'}></DarkButton>
                                <DarkButton size={'lm'} onClickFunction={handleMint} disableIf={isLoading} text={isLoading ? 'Loading…' : 'Mint'}></DarkButton>
                                </div>
                            </Form>
                    </div>
                    <div class="left-point"></div>                
                </div>
        
            </div>		
	    </div>
    );
}

export default SpeechBubble;
