
import React from "react";

class TextBubbleSvg extends React.PureComponent {

  render() {
    
    return (
      <svg viewBox="0 120 312.13879 236.9641" version="1.1" id="svg754"
        xmlns="http://www.w3.org/2000/svg">
        <defs id="defs758" />
        <g stroke="#ffffff" id="g746" transform="translate(-514.52069,-33.425619)">
            <g strokeMiterlimit="10" strokeWidth="2" id="g742">
              <use href="#C" id="use738" />
            </g>
            <path strokeMiterlimit="11.3" strokeWidth="9"
              d="m 548,163 c 24,11 282,-31 274,24 l -13,101 c -2,15 -102,24 -124,23 l -85,1 -62,63 c 29,-107 -2,-47 -14,-104 5,-26 -26,-111 24,-108 z"
              fill="none" id="path744" />
        </g>
        <text xmlSpace="preserve" x="158.47931" y="189.57439" fontVariant="normal" fontFamily="Yu Gothic UI" textAnchor="middle" fontSize="37px" fontWeight="700" fill="#ffffff" id="text752">
         
      {(this.props.text2 !== "") ? <tspan x="155.38" y="189.66" id="tspan26">{this.props.text1}</tspan> : ""}
      {(this.props.text2 !== "") ? <tspan x="155.38" y="236.86" id="tspan28">{this.props.text2}</tspan> : ""}
      {(this.props.text2 === "") ? <tspan x="155.38" y="212.26" id="tspan26">{this.props.text1}</tspan> : ""}
       
      </text>
   </svg>
    );
  }
}

TextBubbleSvg.defaultProps = {
   role: "img",
   focusable: "false"
 };


export default TextBubbleSvg;

