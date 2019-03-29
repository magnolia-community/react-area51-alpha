import React from 'react';

import ENVIRONMENT from "../../environments/environment"

class TextImage extends React.Component {

	render() {
		var damURL = ENVIRONMENT.damUrl + this.props.image;

	    return (
	    	<div>
	    		<h5 className="light">{this.props.title}</h5>
				<div>
	    			<img className="img-responsive" src={damURL} alt=""/>
	    		</div>
	    		<div>
					<p>{this.props.text}</p>
	    		</div>
				<div class="component-name">TextImage</div>
	    	</div>
	    );
	}
}

export default TextImage;
