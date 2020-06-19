import React from 'react';
import './Card.css';

const Card = (props) => {

  const imageURL = props.media_type === "image" ? props.image : "old-tv.jpg";

  return(
        <div id={props.text} 
            className="fl w-50 w-third-m w-25-ns container pointer"
            onClick={props.selectCard}>

          <div className="aspect-ratio aspect-ratio--16x9">
            <div className="bg-center cover aspect-ratio--object"
              style={{backgroundImage: `url(${imageURL})`}}>
              <h1 className="cover-text bodoni f3">
                <span>{props.text}</span>
              </h1>
            </div>
          </div>
        </div>
    );

}

export default Card;