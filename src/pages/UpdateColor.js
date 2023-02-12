
import React, {useEffect, useState} from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import info from "../images/info-24.png"
import DarkButton from "../interact/button/button";
import {Form} from "react-bootstrap";
import "./UpdateColor.css";
import {updateColor} from "../interact/wallet/wallet";

function UpdateColor() {

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

    if(text.length == 0){
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
  
      console.log("called update color")
        updateColor(tokenId, headColor, eyeColor, textColor, mouthColor, setTxHash, setIsLoading)      
};


    return (
      <div className="colorGrid">                        
      <Form variant="dark">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"  variant="dark">
                  <Form.Label></Form.Label>
                  <Form.Control
                      name="TokenId"
                      size="sm"    
                      variant="dark"                            
                      placeholder="Token Id"                    
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
              <DarkButton size={'lm'} onClickFunction={handleUpdateColor} disableIf={isLoading} text={isLoading ? 'Updating…' : `Update Color`}></DarkButton>
          </Form>

</div>
    );
}

export default UpdateColor;
