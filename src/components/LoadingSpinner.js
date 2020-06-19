import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import BeatLoader from 'react-spinners/BeatLoader';

const LoadingSpinner = (props) => {

  const { promiseInProgress } = usePromiseTracker({delay: 500});

  return (
    <div className="tc">
        {promiseInProgress? 
        <BeatLoader color="#AEADA7"
                    size={15}  
                    margin={2}/>
        :<div style={{height:22.2}}></div>}
    </div>
  );

}

export default LoadingSpinner;