import React from 'react';

import {Area} from 'magnolia-react-area51';

import {dlog} from '../AppHelpers';

class Column extends React.Component {

	/**
	 * Render the component
	 */
	render() {
		dlog("render column.")
		return (
	    	<div className={this.props.column.className}>
				<Area
					cmsAreaName={this.props.column.cmsAreaName}
					parentPath={this.props.column.parentPath}
					parentTemplateID={this.props.column.parentTemplateID}
					/>
	    	</div>
	    );
		}

}

export default Column;
