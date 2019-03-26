import React from 'react';

import ENVIRONMENT from "../../environments/environment"

class Slide extends React.Component{

  render() {
    var damURL = ENVIRONMENT.damUrl + this.props.image;

    return (
      <div className="row" style={{border: '1px solid black'}}>
        <div className="col-xs-12">
          <img className="img-responsive" src={damURL} alt=""/>
        </div>
        <div className="col-xs-12">
          <h2 className="light">{this.props.title}</h2>
        </div>
      </div>
    );
  }
}

export default Slide;
