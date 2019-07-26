import React, { Component } from "react";

//import { withRouter } from "react-router-dom";
//import axios from "axios";

import { MagnoliaConfigContext } from "magnolia-react-area51";
import { Page } from "magnolia-react-area51";

// import { Page } from './react-magnolia';
// import MagnoliaConfigContext from './MagnoliaConfigContext';

import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";

import config from "./magnolia.config";

//import COMPONENTS from "./mapping";
//
import { dlog, inPageEditor } from "./AppHelpers";
//

// import PAGE_MODEL from "./sampleData/page-model";
// import TEMPLATE_DEFINITIONS from "./sampleData/template-definitions";
//

class App extends Component {
  /**
   * On init
   */
  //
  // constructor(props) {
  //   super(props);
  //
  //   dlog("***");
  //   dlog("App Constructor.");
  //
  //   this.USE_SAMPLE_DATA = false;
  //
  //   if (this.props.useSampleData) {
  //     this.USE_SAMPLE_DATA = true;
  //   }
  //
  //   this.loadPageContent = this.loadPageContent.bind(this);
  //
  //   // Initialize state object.
  //   this.state = {
  //     init: false,
  //     inPageEditor: false,
  //     rootCmsPath: process.env.REACT_APP_BASE,
  //     serverPath: process.env.REACT_APP_SERVER_PATH,
  //     componentMap: COMPONENTS,
  //     content: {},
  //     templateDefinitions: {}
  //   };
  // }

  state = {
    page: window.isEditMode ? window.singlePageConfig.content : undefined
  };

  getPage = () => {
    const re = new RegExp(
      `/magnoliaAuthor/|${process.env.REACT_APP_BASE}|.html`,
      "g"
    );
    const pathname = window.location.pathname.replace(re, "");
    dlog("getPage pathname:" + pathname);

    const url =
      process.env.REACT_APP_ORIGIN +
      process.env.REACT_APP_SERVER_PATH +
      process.env.REACT_APP_REST_CONTENT +
      (inPageEditor() ? "/" : process.env.REACT_APP_BASE) +
      (pathname ? pathname : "");

    dlog("getPage url:" + url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        //debugger;
        this.setState({ page: json });
        document.documentElement.scrollTop = 0;
      });
  };

  /**
   * Once the component and all his children are rendered
   */
  componentDidMount() {
    // dlog("App. componentDidMount.");
    //
    // if (this.USE_SAMPLE_DATA) {
    //   this.props.history.push("/mars/phobos");
    //   this.useSampleData();
    // } else {
    //   if (window.singlePageConfig != null) {
    //     //App is running in Magnolia page.
    //
    //     this.setState({
    //       init: true,
    //       inPageEditor: inPageEditor(),
    //       content: window.singlePageConfig.content,
    //       templateDefinitions: window.singlePageConfig.templateDefinitions
    //     });
    //   } else {
    //     var h = this.props.history.location.pathname;
    //     //this.loadPageContent('/')
    //     this.loadPageContent(h);
    //   }
    // }

    window.addEventListener("pushState", this.getPage, false);
    window.addEventListener("popstate", this.getPage, false);

    if (!this.state.page) this.getPage();
  }
  //
  // loadPageContent(relativePath) {
  //   dlog("loadPageContent:" + relativePath);
  //   if (this.USE_SAMPLE_DATA) {
  //     return;
  //   }
  //
  //   relativePath = this.removeExtension(relativePath);
  //
  //   // if (relativePath.lastIndexOf(".") > 0) {
  //   //   relativePath = relativePath.substr(0, relativePath.lastIndexOf("."));
  //   // }
  //
  //   this.setState({ init: false });
  //
  //   var fullURL =
  //     process.env.REACT_APP_ORIGIN + process.env.REACT_APP_SERVER_PATH + process.env.REACT_APP_REST_CONTENT + process.env.REACT_APP_BASE + relativePath;
  //   dlog("Request content from: " + fullURL);
  //
  //   //Loads the single page config
  //   axios
  //     .get(fullURL)
  //     .then(response => {
  //       dlog("***");
  //       dlog("Content: got magnolia page content.");
  //
  //       this.setState({
  //         init: true,
  //         inPageEditor: inPageEditor(),
  //         content: response.data,
  //
  //         /* TODO If we every want edit (or debug, or test)
  //         outside the context of a magnolia page template -
  //       then we Also need an endpoint to get the template definitions. */
  //         templateDefinitions: null
  //       });
  //     })
  //     .catch(error => {
  //       dlog(error);
  //     });
  // }
  //
  // useSampleData() {
  //   dlog("***");
  //   dlog("Content: Use Sample Data.");
  //
  //   this.setState({
  //     init: true,
  //     inPageEditor: inPageEditor(),
  //     content: PAGE_MODEL,
  //     templateDefinitions: TEMPLATE_DEFINITIONS
  //   });
  // }
  //
  // getEditorPath(relativePath) {
  //   // remove serverPath
  //   relativePath = relativePath.substr(process.env.REACT_APP_SERVER_PATH.length);
  //
  //   // remove rootCmsPath
  //   relativePath = relativePath.substr(process.env.REACT_APP_BASE.length);
  //   return relativePath;
  // }
  //
  // removeExtension(path) {
  //   if (path.indexOf(".") > -1) {
  //     path = path.substr(0, path.lastIndexOf("."));
  //   }
  //   return path;
  // }
  //
  // componentWillMount() {
  //   // Use ReactRouter to handle route events when the browser URL changes.
  //   this.unlisten = this.props.history.listen((location, action) => {
  //     var relativePath = location.pathname;
  //
  //     if (this.state.inPageEditor) {
  //       relativePath = this.getEditorPath(relativePath);
  //     }
  //
  //     relativePath = this.removeExtension(relativePath);
  //
  //     dlog("***");
  //     dlog("Route Change. RelativePath: " + relativePath);
  //
  //     this.loadPageContent(relativePath);
  //   });
  // }
  // componentWillUnmount() {
  //   //this.unlisten();
  // }

  render() {
    const { page } = this.state;

    return (
      <div>
        <MagnoliaConfigContext.Provider value={config}>
          <Navigation />
          {page && <Page {...page} />}
          <Footer />
        </MagnoliaConfigContext.Provider>
      </div>
    );

    // if (this.state.init) {
    //   dlog("***");
    //   dlog("App Render.");
    //
    //   return (
    //     <div>
    //       <Navigation />
    //       <MagnoliaConfigContext.Provider value={this.state}>
    //         <Page />
    //         {/*<PageHome/>*/}
    //
    //         <Footer />
    //       </MagnoliaConfigContext.Provider>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <Navigation />
    //       <p>Loading content from CMS...</p>
    //     </div>
    //   );
    // }
  }
}
export default App;
