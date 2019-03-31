import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';

import ENVIRONMENT from "../../environments/environment"

import {dlog, getRelativePath, getLink, inPageEditor} from '../AppHelpers';


class Navigation extends Component {

	constructor(props) {
		super(props);

		dlog('***');
		dlog("Navigation: " );

		this.loadNavContent = this.loadNavContent.bind(this);

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


	getPathOfPageFromURL(){
		var pathOfPage = window.location.pathname;
		//Remove any extension.
		if (pathOfPage.lastIndexOf('.')>0){
			pathOfPage = pathOfPage.substr(0, pathOfPage.lastIndexOf('.'));
		}
		//Remove trailing slash
		if (pathOfPage[pathOfPage.length-1]==='/'){
			pathOfPage = pathOfPage.substr(0, pathOfPage.length-1);
		}
		return pathOfPage;
	}



  render() {
		if (!this.state.init){
			return null;
		}

		//Which is this pages ancestor?
		var subNavOfThisPage;
		var pathOfPage = this.getPathOfPageFromURL();

		this.state.nav['@nodes'].map(function(nodeName){
			var item = this.state.nav[nodeName];
			var path = item['@path'];
			var pathOfItem = getRelativePath(path, ENVIRONMENT.serverPath, ENVIRONMENT.rootCmsPath, inPageEditor());
			//dlog("page:"+ pathOfPage + " & item:" + pathOfItem)
			if (pathOfPage.indexOf(pathOfItem) > -1){
				subNavOfThisPage = item;
			}
			return null;
		},this)

	
    return (

<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
	
	<Link to={getLink(ENVIRONMENT.rootCmsPath, ENVIRONMENT.serverPath, ENVIRONMENT.rootCmsPath, inPageEditor())} className="navbar-brand">{this.state.nav.title}</Link>
	
	<div className="navbar-collapse">	
		<div className="nav-stack">
			<ul className="navbar-nav">
				<MenuItems spec={this.state.nav} context={this.context} class1="nav-item" class2="nav-link" />
			</ul>
			<ul className="navbar-nav">
					<MenuItems spec={subNavOfThisPage} context={this.context}  class1="nav-item" class2="nav-link" />
			</ul>
		</div>
	</div>

</nav>


    );
  }
}


const MenuItems = (props) => {
	
	if (!props.spec){
		dlog("SubNav. No spec.")
		return null;
	}

	var items = [];
		props.spec['@nodes'].map(function(nodeName){
			items.push(props.spec[nodeName])
			return null;
		},this)


	return items.map(item => (
   
		<li key={item['@path']}  className={props.class1}>
			<Link className={props.class2} to={getLink(item['@path'], ENVIRONMENT.serverPath, ENVIRONMENT.rootCmsPath, inPageEditor())}>{item.title}</Link>
		</li>
  
	))
};


export default Navigation;