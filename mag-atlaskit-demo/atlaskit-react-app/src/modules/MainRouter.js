import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';

import axios from "axios";

import { Area51Context } from "magnolia-react-area51";

import { dlog, inPageEditor } from "../AppHelpers";

import ENVIRONMENT from "../environments/environment";
import COMPONENTS from "../mapping";
import PAGE_MODEL from "../sampleData/page-model";
import TEMPLATE_DEFINITIONS from "../sampleData/template-definitions";


export default class MainRouter extends Component {
  constructor() {
    super();
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304,
      }
    }


    this.loadPageContent = this.loadPageContent.bind(this);

    // Initialize state object.
    this.state = {
      init: false,
      inPageEditor: false,
      rootCmsPath: ENVIRONMENT.rootCmsPath,
      serverPath: ENVIRONMENT.serverPath,
      componentMap: COMPONENTS,
      content: {},
      templateDefinitions: {}
    };
  }


  /**
   * Once the component and all his children are rendered
   */
  componentDidMount() {
    dlog("App. componentDidMount.");

    if (this.USE_SAMPLE_DATA) {
      this.props.history.push("/mars/phobos");
      this.useSampleData();
    } else {
      if (window.singlePageConfig != null) {
        //App is running in Magnolia page.

        this.setState({
          init: true,
          inPageEditor: inPageEditor(),
          rootCmsPath: ENVIRONMENT.rootCmsPath,
          serverPath: ENVIRONMENT.serverPath,
          componentMap: COMPONENTS,
          content: window.singlePageConfig.content,
          templateDefinitions: window.singlePageConfig.templateDefinitions
        });
      } else {
        //Requires ReactRouterv4 var h = this.props.history.location.pathname;
        this.loadPageContent('/')
        //this.loadPageContent(h);
      }
    }
  }

  loadPageContent(relativePath) {
    dlog("loadPageContent:" + relativePath);
    if (relativePath.lastIndexOf(".") > 0) {
      relativePath = relativePath.substr(0, relativePath.lastIndexOf("."));
    }

    this.setState({ init: false });

    if (this.USE_SAMPLE_DATA) {

      this.useSampleData();
    } else {
      var fullURL =
        ENVIRONMENT.restUrlBase + ENVIRONMENT.rootCmsPath + relativePath;
      dlog("Request content from: " + fullURL);

      //Loads the single page config
      axios
        .get(fullURL)
        .then(response => {
          dlog("***");
          dlog("Content: got magnolia page content.");

          this.setState({
            init: true,
            inPageEditor: inPageEditor(),
            serverPath: ENVIRONMENT.serverPath,
            rootCmsPath: ENVIRONMENT.rootCmsPath,
            componentMap: COMPONENTS,
            content: response.data,

            /* TODO If we every want edit (or debug, or test)
						outside the context of a magnolia page template - 
					then we Also need an endpoint to get the template definitions. */
            templateDefinitions: null
          });
        })
        .catch(error => {
          dlog(error);
        });
    }
  }

  useSampleData() {
    dlog("***");
    dlog("Content: Use Sample Data.");

    this.setState({
      init: true,
      inPageEditor: inPageEditor(),
      rootCmsPath: ENVIRONMENT.rootCmsPath,
      serverPath: ENVIRONMENT.serverPath,
      componentMap: COMPONENTS,
      content: PAGE_MODEL,
      templateDefinitions: TEMPLATE_DEFINITIONS
    });
  }












  getChildContext () {
    return {
      navOpenState: this.state.navOpenState,
    };
  }

  appWithPersistentNav = () => (props) => (
    <App
      onNavResize={this.onNavResize}
      {...props}
    />
  )

  onNavResize = (navOpenState) => {
    this.setState({
      navOpenState,
    });
  }

  render() {

    if (!this.state.init) {
      dlog("***");
      dlog("MainRouter. State not initialized.");
      return null;
    }

    dlog("***");
    dlog("MainRouter Render.");

    return (
      <Area51Context.Provider value={this.state}>
      <Router history={browserHistory}>
        <Route component={this.appWithPersistentNav()}>
          <Route path="/settings" component={SettingsPage} />
          
          <Route path="*" component={HomePage} />
          
        </Route>
      </Router>
      </Area51Context.Provider>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object,
}
