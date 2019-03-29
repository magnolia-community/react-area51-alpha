import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';

import ENVIRONMENT from "../../environments/environment"

import {dlog} from '../AppHelpers';


class Navigation extends Component {


	constructor(props) {
		super(props);

		dlog('***');
		dlog("Navigation: " );

		this.loadNavContent = this.loadNavContent.bind(this);
		//this.getRelativePath = this.getRelativePath.bind(this);

		// Initialize state object.
		this.state = {
			init: false,
			nav: {}
		};

		this.USE_SAMPLE_DATA = false;
	}


	componentWillMount() {
		this.loadNavContent();
	}


	loadNavContent(){
		
		if (this.USE_SAMPLE_DATA){
			this.useSampleData();
		}else{

			axios
				.get(ENVIRONMENT.restUrlNav + ENVIRONMENT.rootCmsPath )
				.then(response => {
					dlog('***');
					dlog("Navigation: got nav content.")

					this.setState( {
						init: true,
						nav: response.data
					} );

				}).catch(error => {
				    dlog(error);
				});
			}
	}

	useSampleData(){
		this.setState( {
			init: true,
			nav:
				{"@name":"train-react","@path":"/train-react","@id":"5a9434c0-5be9-428a-9d5f-0e6562cf36a9","@nodeType":"mgnl:page","title":"Magnolia train station (React)","dashboard":{"@name":"dashboard","@path":"/train-react/dashboard","@id":"b35d03cd-c266-4d66-957e-c76ed9313a47","@nodeType":"mgnl:page","title":"Dashboard","cars":{"@name":"cars","@path":"/train-react/dashboard/cars","@id":"02c7e990-90e0-4712-b4ac-7d506f12d9ee","@nodeType":"mgnl:page","title":"Cars","@nodes":[]},"@nodes":["cars"]},"bikes":{"@name":"bikes","@path":"/train-react/bikes","@id":"b44dad1a-6117-4d64-b9e0-873e714a8773","@nodeType":"mgnl:page","title":"Bikes","@nodes":[]},"@nodes":["dashboard","bikes"]}
		});
	}


  render() {
		if (!this.state.init){
			return null;
		}

		var items = [];
		this.state.nav['@nodes'].map(function(nodeName){
			items.push(this.state.nav[nodeName])
			return null;
		},this)


    return (

<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
	
	<Link to={'/'} className="navbar-brand">{this.state.nav.title}</Link>
		<div class="navbar-collapse">
			<ul class="navbar-nav">
				<MenuItems items={items} />
			</ul>
		</div>
 
</nav>

    );
  }
}

class MenuItem extends Component {

	/**
	 * When not in page editor (in CMS), then strip off that root path.
	 * @param {*} path 
	 */
	getRelativePath(path, inPageEditor){
		if (inPageEditor){
			return path;
		} 
		// Just strip off the pathOfPage. We assume it is the correct path root.
		var relativePath = path.substr(ENVIRONMENT.rootCmsPath.length);
		return relativePath;
	}

  render () {	
		var items = [];
		this.props.spec['@nodes'].map(function(nodeName){
			items.push(this.props.spec[nodeName])
			return null;
		},this)

		var url = this.getRelativePath(this.props.spec['@path'], this.context.inPageEditor);
		if (!url){
			url = "/";
		}

    return (

      <li key={this.props.spec['@path']} class="nav-item">
				<Link to={url} class="nav-link">{this.props.spec.title}</Link>
				{/* <ul key={this.props.spec['@path']} className={this.props.class}>
        	<MenuItems items={items} class={this.props.class}/>
      	</ul> */}
			</li>
    )
  }
};

const MenuItems = (props) => {
  return props.items.map(item => (
   
      <MenuItem spec={item} />
  
  ))
};


export default Navigation;