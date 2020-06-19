import React from 'react';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

const CardList = (props) => {
  let cards = [];

  for(let key of props.images.keys()){
      cards.push(<Card key={key}
                      text={key}
                      media_type={props.images.get(key).media_type}
                      image={props.images.get(key).url} 
                      selectCard={props.selectCard}/>)  
  }

  return(
    <React.Fragment>
      <LoadingSpinner />
      <div className="cf w-100 pv4-l ph3">
        {cards}
      </div>
    </React.Fragment>
  );
  
}

export default CardList;