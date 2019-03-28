import React from 'react';

class Title extends React.Component {

	/**
	 * Render the element
	 */
	render() {
		return (
	    	<h2>{this.props.title}</h2>
	    );
	}
}

export default Title;
