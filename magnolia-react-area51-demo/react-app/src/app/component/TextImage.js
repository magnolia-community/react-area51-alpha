import React from 'react';

import ENVIRONMENT from "../../environments/environment"

class TextImage extends React.Component {



	render() {

		function CleanImage(props) {
			if (props.image) {
			  var damURL = ENVIRONMENT.server + props.image.renditions['480'].link;
		  
			  return <img className="img-responsive" src={damURL} alt="TextIm alt."/>;
			}
			return null;
		  }

	    return (
	    	<div>
	    		<h5 className="light">{this.props.title}</h5>
				<div>
	    			<CleanImage image={this.props.image} />
	    		</div>
	    		<div>
					<p dangerouslySetInnerHTML={{__html:this.props.text}}></p>
	    		</div>
				<div className="component-name">TextImage</div>
	    	</div>
	    );
	}
}

export default TextImage;
