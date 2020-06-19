import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollArrow = (props) => {
  const[ showScroll, setShowScroll ] = useState(false);

  const checkScrollTop = () => {
    if(!showScroll && window.pageYOffset > 400){
      setShowScroll(true);
    }else if(showScroll && window.pageYOffset <= 400){
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  window.addEventListener('scroll', checkScrollTop);

  return(
      <FaArrowCircleUp className="scrollTop light-color "
          onClick={scrollTop}
          style={{height: 40, display: showScroll?'flex':'none'}} />
  );
}

export default ScrollArrow;