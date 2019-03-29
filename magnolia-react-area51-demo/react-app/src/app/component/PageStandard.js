import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import {dlog} from '../AppHelpers';

import Row from './Row';

class PageStandard extends Component {

  /**
   * Render component
   */
  render() {

	let parentComponentID = this.props["mgnl:template"];
	let path = this.props["@path"];

	var row1 = [
		{
      className: "col-xs-12 col-md-6",
			path: path,
			cmsAreaName: "left",
			parentComponentID: parentComponentID
		}
    ,
		{
			className: "col-xs-12 col-md-6",
			path: path,
			cmsAreaName: "right",
			parentComponentID: parentComponentID
		}
	];

	var row2 = [
		{
      className: "col-xs-12",
			path: path,
			cmsAreaName: "schedule",
			parentComponentID: parentComponentID
		}
	];

	dlog("render PageStandard.")
	
    return (
			<div>

				<div className="container">

					<h1 class="bd-title">{this.props.title}</h1>
					<div class="component-name">Page Standard</div>
					<div>
						<div>
							<Route path="/dashboard(.html)?/" />
						</div>
					</div>

					<Row columns={row1}/>
					<Row columns={row2}/>
				</div>
			</div>
    );
  }
}



export default PageStandard;
