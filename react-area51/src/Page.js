import React from 'react';

import Area51Context from './Area51Context';
import {instantiateReactComponent} from './Helpers';

import {dlog} from './Helpers';

class Page extends React.Component {

	// Use React Context API.
	// 'this.context' now contains the context managed in Area51Context.
	// This enables the managed content to be passed into the components.
	static contextType = Area51Context;

	/**
	 * Returns the components (with their managed content) as an array of objects.
	 */
	getPage(){

		dlog("getPage.contentinit?" + this.context.init.toString())
		var contextService = new this.props.CTXService(this.context);
		
		if (this.context.content != null) {
			var page = contextService.getPage();
			return page;
		}
	}

	/**
	 * Render Page
	*/
	render() {
		
		//console.log("Area render:" + this.props.cmsAreaName);
		const page = this.getPage();

		let pageElement = null;
		if (page){
			pageElement = instantiateReactComponent(page, this.props, this.context.componentMap, true)
		}

		let DebugInfo = "";

		const DEBUG_MODE = false;
		if (DEBUG_MODE){
			DebugInfo = "PAGE.";
		}

		return (
	    	<div >
				{DebugInfo}
				{ pageElement }
	    	</div>
	    );
		}

}


export default Page;
