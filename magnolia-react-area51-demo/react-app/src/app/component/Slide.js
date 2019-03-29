import React from 'react';

import ENVIRONMENT from "../../environments/environment"

class Slide extends React.Component{

  render() {

    var damURL = ENVIRONMENT.damUrl + this.props.image;
    
    function CardImage(props) {
      if (props.image) {
        return <img class="card-img-top" src={damURL} alt="Card alt."/>;
      }
      return null;
    }


    return (

      <div class="card slide" style={{width: '18rem'}}>
        <CardImage image={this.props.image}/>
        <div class="card-body">
          <h5 class="card-title">{this.props.title}</h5>
          <p class="card-text">{this.props.body}</p>
        </div>
      </div>

    );
  }
}

export default Slide;
