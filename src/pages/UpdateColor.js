
import React, {useState, useEffect} from "react";
import DarkButton from "../interact/button/button";
import {Form} from "react-bootstrap";
import "./UpdateColor.css";
import {ownerOf, updateColor, getMetadata} from "../interact/wallet/wallet";
import {Alert} from "react-bootstrap";
import MoreInfoColorChange from "./MoreInfoColorChange";
import Image from "react-bootstrap/Image";
import TextBubbleSvg from "./TextBubbleSvg"

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
  const [pepeSvg, setPepeSvg] = useState("");

    useEffect(() => {
        if(connectedAdress !== ""){
            setInputErrorMessage("")
        }
    },[connectedAdress])

  function isValidColor(str) {
    return /^[0-9A-F]{6}$/i.test(str);
  }

  function handleInputChange(e) {
    let text = e.target.value

    if(e.target.name === 'TokenId'){
      setTokenId(text)
      setInputErrorMessage("")
      return;
    }

    let hexColor = text.replace('#', '')

    if(e.target.name === 'Head'){
      setHeadColor(hexColor);
      setPepeSvg(pepeSvg.replace(/(?<=fill=\"#)(.*)(?=\" d=\"M497)/, hexColor));
    }
    else if(e.target.name === 'Eye'){
      setEyeColor(hexColor);
      setPepeSvg(pepeSvg.replace(/(?<=repeatCount=\"indefinite\" values=\"#000;#)(.*)(?=;#000\"\/>)/, hexColor))
    }
    else if(e.target.name === 'Mouth'){
      setMouthColor(hexColor);
      setPepeSvg(pepeSvg.replace(/(?<=id=\"C\" fill=\"#)(.*)(?=\" d=\"M419)/, hexColor))
    }
    else if(e.target.name === 'Text'){
      setTextColor(hexColor);
      setPepeSvg(pepeSvg.replace(/(?<=attributeName="fill" values="#000;#)(.*)(?=;#000;#000)/, hexColor));
    }

}

const handleGetMetaData = () => {
        if(tokenId === ""){
            setInputErrorMessage(`Please provide an token id`);
            setValidated(true);
            setIsValidHexColor(false);
        }
        try {
            getMetadata(tokenId).then((m) => {
                if (m.includes("URI query for nonexistent")) {
                    setInputErrorMessage(`No Pepe with token id ${tokenId}`);
                    setValidated(true);
                    setIsValidHexColor(false);
                } else {
                    let base64Metadata = m.replace("data:application/json;base64,", "");
                    let decodedData = JSON.parse(Buffer.from(base64Metadata, 'base64').toString('utf8'));
                    let svg = Buffer.from(decodedData.image.replace("data:image/svg+xml;base64,", ""), 'base64').toString('utf8');

                    svg  = svg.replace(/(?<=.E{fill:none})(.*)(?=F{stroke:#000})/, ".L{stroke:#fff}.")
                    svg  = svg.replace(/(?<=108z\" class=)(.*)(?=E\"\/>)/, "\"L ")
                    setPepeSvg(svg);

                    setHeadColor(decodedData.attributes.filter(item => item.trait_type === 'Head color')[0].value.replace('#', ''))
                    setTextColor(decodedData.attributes.filter(item => item.trait_type === 'Text color')[0].value.replace('#', ''))
                    setMouthColor(decodedData.attributes.filter(item => item.trait_type === 'Mouth color')[0].value.replace('#', ''))
                    setEyeColor(decodedData.attributes.filter(item => item.trait_type === 'Eye color')[0].value.replace('#', ''))

                }
            })
        }
        catch (e){
            if(e.message.includes("URI query for nonexistent")){
                setInputErrorMessage(`No Pepe with token id ${tokenId}`);
                setValidated(true);
                setIsValidHexColor(false);
            }
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
          {pepeSvg !== "" ? <Image width={700} height={700}  src={`data:image/svg+xml;utf8,${encodeURIComponent(pepeSvg)}`} /> : <div style={{width: 700, height: 700}}><TextBubbleSvg text1={"Please fetch"} text2={"metadata"}></TextBubbleSvg></div> }

        <Form variant="dark">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"  variant="dark">
                  <div className="color-buttons">
                      <Form.Label>Token Id</Form.Label>
                      <Form.Control
                          name="TokenId"
                          size="sm"
                          className="colorbutton"
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
                  </div>
                  <div className="color-buttons">
                      <Form.Label color="white">Head color</Form.Label>
                      <Form.Control
                          name="Head"
                          size="sm"
                          value={'#' + headColor}
                          className="colorbutton"
                          placeholder="Head color"
                          variant="dark"
                          onChange={handleInputChange}
                          required
                          type="color"
                          maxLength={6}
                      />
                  </div>
                  <div className="color-buttons">
                      <Form.Label>Eyes color</Form.Label>
                      <Form.Control
                          name="Eye"
                          size="sm"
                          variant="dark"
                          className="colorbutton"
                          value={'#' + eyeColor}
                          placeholder="Eye color"
                          type="color"
                          maxLength={6}
                          onChange={handleInputChange}
                      />
                  </div>
                  <div className="color-buttons">
                      <Form.Label>Text color</Form.Label>
                      <Form.Control
                          name="Text"
                          size="sm"
                          variant="dark"
                          className="colorbutton"
                          placeholder="Text color"
                          value={'#' + textColor}
                          type="color"
                          maxLength={6}
                          onChange={handleInputChange}
                      />
                  </div>
                  <div className="color-buttons">
                      <Form.Label>Mouth color</Form.Label>
                      <Form.Control
                          name="Mouth"
                          size="sm"
                          variant="dark"
                          className="colorbutton"
                          placeholder="Mouth color"
                          value={'#' + mouthColor}
                          type="color"
                          maxLength={6}
                          onChange={handleInputChange}                      />
                  </div>
                  <Form.Control.Feedback type="invalid">{inputErrorMessage}</Form.Control.Feedback>
              </Form.Group>
            <div className='update-buttons'>
                <DarkButton size={'sm'} onClickFunction={handleGetMetaData} disableIf={isLoading} text={isLoading ? 'Updating… ' : `Fetch Metadata`}></DarkButton>
                <DarkButton size={'sm'} onClickFunction={handleUpdateColor} disableIf={isLoading} text={isLoading ? 'Updating… ' : `Update Color`}></DarkButton>
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

