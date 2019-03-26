import React, { Component } from 'react';
import {withRouter } from 'react-router-dom'
import axios from 'axios';

import {Area51Context} from 'magnolia-react-area51';
import {Page} from 'magnolia-react-area51';

import Footer from './app/component/Footer';
import Navigation from './app/component/Navigation';

import {dlog} from './app/AppHelpers';

import ENVIRONMENT from "./environments/environment"
import COMPONENTS from './app/mapping'

import PAGE_MODEL from './sampleData/page-model';
import TEMPLATE_DEFINITIONS from './sampleData/template-definitions';




class App extends Component {

	/**
	 * On init
	 */
	constructor(props) {
		super(props);

		dlog('***');
		dlog("App Constructor.")

		this.USE_SAMPLE_DATA = false;

		this.loadPageContent = this.loadPageContent.bind(this);

		// Initialize state object.
		this.state = {
			init: false,
			inPageEditor: false,
			rootCmsPath: ENVIRONMENT.rootCmsPath,
			componentMap:COMPONENTS,
			content: {},
			templateDefinitions: {}
		};
	}

	/**
	 * Once the component and all his children are rendered
	 */
	componentDidMount() {
		dlog("App. componentDidMount.");

		if (this.USE_SAMPLE_DATA){
			this.useSampleData();
		}else{

			if (window.singlePageConfig != null) {
				//App is running in Magnolia page.

				this.setState( {
					init: true,
					inPageEditor: this.inPageEditor(),
					rootCmsPath: ENVIRONMENT.rootCmsPath,
					componentMap:COMPONENTS,
					content: window.singlePageConfig.content,
					templateDefinitions: window.singlePageConfig.templateDefinitions
				} );
				
			} else {
				var h = this.props.history.location.pathname;
				//this.loadPageContent('/')
				this.loadPageContent(h);
			}
		}

	}

	loadPageContent(relativePath){

		dlog("loadPageContent:" + relativePath);
		if (relativePath.lastIndexOf('.')>0){
			relativePath = relativePath.substr(0, relativePath.lastIndexOf('.'));
		}

		this.setState ( {init:false});

		if (this.USE_SAMPLE_DATA){
			this.useSampleData();
		}else{

			//Loads the single page config
			axios
				.get(ENVIRONMENT.restUrlBase + ENVIRONMENT.rootCmsPath + relativePath)
				.then(response => {
					dlog('***');
					dlog("Content: got magnolia page content.")

					this.setState( {
						init: true,
						inPageEditor: this.inPageEditor(),
						rootCmsPath: ENVIRONMENT.rootCmsPath,
						componentMap: COMPONENTS,
						content: response.data,

					/* TODO If we every want edit (or debug, or test)
						outside the context of a magnolia page template - 
					then we Also need an endpoint to get the template definitions. */
						templateDefinitions: null
					} );


				}).catch(error => {
				    dlog(error);
				});
			}
	}

	useSampleData(){
		dlog('***');
		dlog("Content: Use Sample Data.");

		this.setState( {
			init: true,
			inPageEditor: this.inPageEditor(),
			rootCmsPath: ENVIRONMENT.rootCmsPath,
			componentMap:COMPONENTS,
			content: PAGE_MODEL,
			templateDefinitions: TEMPLATE_DEFINITIONS
		} );
	}

	inPageEditor(){
		if (window.inPageEditor === true){
			return true;
		} else{
			return false;
		}
	}


	componentWillMount() {

		// Use ReactRouter to handle route events when the browser URL changes.
    this.unlisten = this.props.history.listen((location, action) => {
			
			var relativePath = 	location.pathname;
			if (relativePath.indexOf('.')>-1){
				relativePath = relativePath.substr(0, relativePath.lastIndexOf('.'));
			}

			dlog('***');
			dlog("Route Change. RelativePath: " + relativePath);

			this.loadPageContent(relativePath)
    });
  }
  componentWillUnmount() {
      //this.unlisten();
  }


	render() {

		if ( this.state.init ) {
			dlog('***');
			dlog("App Render.")
			
			return (
				<div>
				<Area51Context.Provider value={this.state}>

					<Navigation/>

					<Page/>
					{/*<PageHome/>*/}

					<Footer/>

				</Area51Context.Provider>
				</div>
			);
    } else {
      return null;
    }
	}

}
export default withRouter(App);

