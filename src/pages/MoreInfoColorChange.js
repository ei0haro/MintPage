
import React from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import info from "../images/info-24.png"

function MoreInfoColorChange() {

    const popover = (
        <Popover id="popover-basic">
        <Popover.Header as="h3">Update Color</Popover.Header>
        <Popover.Body>
        A Pepe can be customized by changing its color.
        You can load existing colors for a Pepe by fetching its metadata.
        Changing color is free, but since metadata is updated On Chain you have to pay gas.
        If changing color directly from contract, it must be provided by its 6 character hexadecimal representation without the #.
        </Popover.Body>
      </Popover>
      );

    return (
        <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
        <Button size={'lg'} variant="dark"><img src={info} alt="my"/></Button>
        </OverlayTrigger>
    );
}

export default MoreInfoColorChange;
