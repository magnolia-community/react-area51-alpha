import React from 'react';

//import Area from '../magnolia/Area';
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
					path={this.props.column.path}
					cmsAreaName={this.props.column.cmsAreaName}
					parentComponentID={this.props.column.parentComponentID}
					/>
	    	</div>
	    );
		}

}

export default Column;
