
import React, {useEffect, useState} from "react";
import DarkButton from "../interact/button/button";
import {Form} from "react-bootstrap";
import "./UpdateColor.css";
import {ownerOf, updateColor} from "../interact/wallet/wallet";
import {Alert} from "react-bootstrap";
import MoreInfoColorChange from "./MoreInfoColorChange";

function UpdateColor({connectedAdress}) {

  const [validated, setValidated] = useState(false);
  const [isValidHexColor, setIsValidHexColor] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState(false);
  const [headColor, setHeadColor] = useState("");
  const [mouthColor, setMouthColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [txHash, setTxHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function isValidColor(str) {
    return /^[0-9A-F]{6}$/i.test(str);
  }

  function handleInputChange(e) {
    let text = e.target.value

    if(e.target.name === 'TokenId'){

      setTokenId(text);
      return;
    }

    if(text.length === 0){
      setValidated(true);
      setIsValidHexColor(true);
    }
    else if(!isValidColor(text)){
        setValidated(true);
        setIsValidHexColor(false);
        setInputErrorMessage(`${e.target.name} input is not valid Hex color. Please provide a valid Hex color without the #`);
    }
    else{
      setIsValidHexColor(true);
      setValidated(true);
    }

    if(e.target.name === 'Head'){
      setHeadColor(text);
    }
    else if(e.target.name === 'Eye'){
      setEyeColor(text);
    }
    else if(e.target.name === 'Mouth'){
      setMouthColor(text);
    }
    else if(e.target.name === 'Text'){
      setTextColor(text);
    }
}


const handleUpdateColor = () => {

      if(headColor.length > 0 && !isValidColor(headColor)){
          setValidated(true);
          setIsValidHexColor(false);
          setInputErrorMessage(`Must set valid 6 character hex color for Head`);
      }
      else if(mouthColor.length > 0 && !isValidColor(mouthColor)){
          setValidated(true);
          setIsValidHexColor(false);
          setInputErrorMessage(`Must set valid 6 character hex color for Mouth`);
      }
      else if(eyeColor.length > 0 && !isValidColor(eyeColor)){
          setValidated(true);
          setIsValidHexColor(false);
          setInputErrorMessage(`Must set valid 6 character hex color for Eyes`);
      }
      else if(textColor.length > 0 && !isValidColor(textColor)){
          setValidated(true);
          setIsValidHexColor(false);
          setInputErrorMessage(`Must set valid 6 character hex color for text`);
      }
      else{
          ownerOf(tokenId).then((owner) => {
              if(connectedAdress === ""){
                  setValidated(true);
                  setIsValidHexColor(false);
                  setInputErrorMessage(`Please connect wallet`);
              }
                  else if(owner.toLowerCase() === connectedAdress.toLowerCase()){

                      updateColor(tokenId, headColor, eyeColor, textColor, mouthColor, setTxHash, setIsLoading)
                          .then()
                  }
                  else if(owner === "Invalid token id"){
                      setValidated(true);
                      setIsValidHexColor(false);
                      setInputErrorMessage(`No Pepe with token id ${tokenId}`);
                  }
                  else {
                      setValidated(true);
                      setIsValidHexColor(false);
                      setInputErrorMessage(`You are not owner of Token Id ${tokenId}`);
                  }
              }
          )
      }
};


    return (
        <div>
      <div className="colorGrid">                        
      <Form variant="dark">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"  variant="dark">
                  <Form.Label></Form.Label>
                  <Form.Control
                      name="TokenId"
                      size="sm"    
                      variant="dark"                            
                      placeholder="Token Id"
                      onChange={handleInputChange}
                      maxLength={3}  
                      type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                
                  />
                  <Form.Label></Form.Label>
                  <Form.Control         
                      name="Head"       
                      size="sm"                                
                      placeholder="Head color"    
                      variant="dark"
                      onChange={handleInputChange}                                        
                      required     
                      type="text"
                      maxLength={6}                                        
                      {...(isValidHexColor && validated ? {className:"is-valid"} : {})}
                      {...(!isValidHexColor && validated ? {className:"is-invalid"} : {})}
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                      name="Eye"
                      size="sm"    
                      variant="dark"                            
                      placeholder="Eye color"                                        
                      type="text"
                      maxLength={6}
                      onChange={handleInputChange}
                      {...(isValidHexColor && validated ? {className:"is-valid"} : {})}
                      {...(!isValidHexColor && validated ? {className:"is-invalid"} : {})}                                   
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                      name="Text"
                      size="sm"    
                      variant="dark"                            
                      placeholder="Text color"                                        
                      type="text"
                      maxLength={6}
                      onChange={handleInputChange}
                      {...(isValidHexColor && validated ? {className:"is-valid"} : {})}
                      {...(!isValidHexColor && validated ? {className:"is-invalid"} : {})}                                   
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                      name="Mouth"
                      size="sm"    
                      variant="dark"                            
                      placeholder="Mouth color"                                        
                      type="text"
                      maxLength={6}
                      onChange={handleInputChange}
                      {...(isValidHexColor && validated ? {className:"is-valid"} : {})}
                      {...(!isValidHexColor && validated ? {className:"is-invalid"} : {})}                                   
                  />
                  <Form.Control.Feedback type="invalid">{inputErrorMessage}</Form.Control.Feedback>
              </Form.Group>
          <div className='color-buttons'>
              <DarkButton size={'lm'} onClickFunction={handleUpdateColor} disableIf={isLoading} text={isLoading ? 'Updating…' : `Update Color`}></DarkButton>
                <MoreInfoColorChange></MoreInfoColorChange>
          </div>
          </Form>

        </div>
            {txHash !== "" &&  <Alert variant='dark' onClose={() => setTxHash("")} dismissible>
                Color Updated - txHash: <a href={'https://etherscan.io/tx/' + txHash} >{txHash}</a>
            </Alert>}
        </div>
    );
}

export default UpdateColor;
