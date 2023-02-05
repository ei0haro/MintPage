
import React from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import info from "./images/info-24.png"

function MoreInfo() {

    const popover = (
        <Popover id="popover-basic">
        <Popover.Header as="h3">On Chain Talking Pepe</Popover.Header>
        <Popover.Body>
        <strong>On chain talking Pepe</strong> is a customizable NFT living on the Ethereum block chain. You can decide what your Pepe should say by typing text in the text boxes. 
          
          The text you mint is unique and cannot be minted again. Your Pepe will get a random color at mint, but if you are not satisfied you can change to any color you like, at any time.
        </Popover.Body>
      </Popover>
      );

    return (
        <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
        <Button variant="dark"><img src={info} alt="my image"/></Button>        
        </OverlayTrigger>
    );
}

export default MoreInfo;
