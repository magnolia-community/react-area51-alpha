import React from 'react';

class Title extends React.Component {

	/**
	 * Render the element
	 */
	render() {
		return (
	    	<h1>{this.props.title}</h1>
	    );
	}
}

export default Title;
