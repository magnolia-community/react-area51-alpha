import React from 'react';

import ENVIRONMENT from "../../environments/environment"

class Slide extends React.Component{

  render() {

    
    function CardImage(props) {
      if (props.image) {
        var damURL = ENVIRONMENT.server + props.image.renditions['480'].link;
    
        return <img className="card-img-top" src={damURL} alt="Card alt."/>;
      }
      return null;
    }

    return (

      <div className="card slide" style={{width: '18rem'}}>
        <CardImage image={this.props.image}/>
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.body}</p>
        </div>
      </div>

    );
  }
}

export default Slide;
