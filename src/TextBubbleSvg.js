
import React from "react";

class TextBubbleSvg extends React.PureComponent {

  render() {
    return (
      <svg {...this.props} viewBox="0 0 273.76502 185.097" version="1.1" id="svg32" width="273.76501" height="185.097"
      xmlns="http://www.w3.org/2000/svg">
      <defs id="defs36" />
      <g stroke="#ffffff" id="g24" transform="translate(-463.53374,-5.0410085)">
         <path
            d="m 507.7,12.5 c 19,7.9 219,-20.5 213,20.8 v 67 c 0,11.5 -10,20.8 -27,20.8 H 539.8 l -36,52.3 c 22.2,-79.7 -9.4,-31 -18.9,-73 4.5,-19.9 -15,-90 23,-87.8 z"
            strokeWidth="6.75" strokeMiterlimit="11" fill="none" id="path22" />
      </g>
      <text xmlSpace="preserve" textAnchor="middle" fontWeight="bold" fontFamily="'Yu Gothic UI'" fontSize="31px" fill="#ffffff" id="text30" x="80.379196" y="50.660461">
         
      {(this.props.text2 != "") ? <tspan x="140.38" y="50.66" id="tspan26">{this.props.text1}</tspan> : ""}
      {(this.props.text2 != "") ? <tspan x="140.38" y="87.86" id="tspan28">{this.props.text2}</tspan> : ""}
      {(this.props.text2 == "") ? <tspan x="140.38" y="69.26" id="tspan26">{this.props.text1}</tspan> : ""}
       
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

