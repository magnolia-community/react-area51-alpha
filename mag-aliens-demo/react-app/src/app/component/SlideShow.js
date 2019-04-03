import React from 'react';

import {Area} from 'magnolia-react-area51';

import ENVIRONMENT from "../../environments/environment"

import {dlog} from '../AppHelpers';

function DebugInfo(props) {
	if (ENVIRONMENT.DEBUG_MODE && props.component){
		return (
	    <div className="debug">
				<div>title:{props.title}</div>
				<div>path:{props["@path"]}</div>
				<div>parentTemplateID:{props["mgnl:template"]}</div>
	    </div>
	  );
	}else{
		return null;
	}
}


class SlideShow extends React.Component {

	render() {

		dlog("render slideshow.")
		return (
	    <div className="slideshow">
				<h4>{this.props.title}</h4>
				<div className="component-name">Slideshow</div>

				<DebugInfo {...this.props}/>

				<Area
					className="slides"
					parentPath={this.props["@path"]}
					cmsAreaName="main"
					parentTemplateID={this.props["mgnl:template"]}
				/>
				
			</div>
			
	    );
	}

}

export default SlideShow;
