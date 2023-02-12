
import React from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import info from "../images/info-24.png"

function MoreInfoColorChange() {

    const popover = (
        <Popover id="popover-basic">
        <Popover.Header as="h3">Update Color</Popover.Header>
        <Popover.Body>
        You can customize your Pepe by changing its color. The color must be provided by its 6 character hexadecimal representation without the #.
            If you want to keep a color, you can just leave that field blank.
            Changing color is free, but since metadata is updated On Chain you have to pay gas.
        </Popover.Body>
      </Popover>
      );

    return (
        <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
        <Button variant="dark"><img src={info} alt="my"/></Button>        
        </OverlayTrigger>
    );
}

export default MoreInfoColorChange;
