import React from 'react';

import ENVIRONMENT from "../../environments/environment"

class TextImage extends React.Component {

	render() {
		var damURL = ENVIRONMENT.damUrl + this.props.image;

	    return (
	    	<div className="row">
	    		<div className="col-xs-12">
	    			<img className="img-responsive" src={damURL} alt=""/>
	    		</div>
	    		<div className="col-xs-12">
	    			<h2 className="light">{this.props.title}</h2>
	    		</div>
				<div class="component-name">TextImage</div>
	    	</div>
	    );
	}
}

export default TextImage;
