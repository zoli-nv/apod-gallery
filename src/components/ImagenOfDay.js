import React from 'react';

const ImagenOfDay = (props) => {

  const { copyright, explanation, media_type, title, url} = props.image;

  return(

      media_type === null || media_type === undefined?
        <div>
          <h1 className="tc f3 light-color bodoni">No data available</h1>
        </div>
      :
        <React.Fragment>
          <h1 className="tc f3 light-color bodoni">{title}</h1>
          <div className="cf ph2-ns">
            <div className="fl w-100 w-50-ns pa2">
              {media_type === "image" ?
                <img alt='No data available' 
                    src={url} 
                    width="100%"
                    height="auto"/>
                :
                <iframe title="APOD video"
                        src={url}
                        width="100%"
                        height="350px"/>
              }
            </div>
            <div className="fl w-100 w-50-ns pa2 light-accent">  
              <p className="bodoni">{explanation}</p>
              {copyright !== null && copyright !== undefined?
                <p className="bodoni">Copyright <b>{copyright}</b></p>
                : ""
              }
            </div>
          </div>
        </React.Fragment>
      
    );

}

export default ImagenOfDay;