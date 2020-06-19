import React from 'react';

const Button = (props) => {
  return(
    <div>
      <button className="f6 link dim br-pill ba bw2 ph3 pv2 dib mt2 mb2 dark-shades light-color border-shades"
        onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;