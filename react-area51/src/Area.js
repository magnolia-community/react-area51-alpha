import React from "react";
import ReactDOM from "react-dom";

import Area51Context from "./Area51Context";
import { instantiateReactComponent } from "./Helpers";

import { dlog, removeFileExtension, removeTrailingSlash } from "./Helpers";

/**
 * An Area component enables 'areas' of a React application to be managed in other systems.
 * It does three things.
 * 1. It dynamically instantiates a list of React components based on the contents of a node within a Context item, getting both the type of React component to create and its contents (as props).
 * 2. It provides hints to a PageEditor tool in the form of extra attributes on elements or HTML comments to enable the content to be managed.
 *
 * Notes:
 * * Only components wrapped with withArea51 can be managed.
 * * Areas may be nested.
 * * It gets a CTXService passed in which helps with the things specific to the CMS.
 */
class Area extends React.Component {

  // Use React Context API.
  // 'this.context' now contains the context managed in Area51Context.
  // This enables the managed content to be passed into the components.
  static contextType = Area51Context;

  /**
   * Returns the components (with their managed content) as an array of objects.
   */
  getAreaComponents(cmsAreaName, fullCMSPath, contextService) {
    dlog("getAreasComponents.contentinit?" + this.context.init.toString());

    if (this.context.content != null) {

      // We just want the path to the area within the current page. (Content only stores ONE page, and ITS contents.)
      var pathInPage = this.getPathInPage(
        fullCMSPath,
        this.context.serverPath,
        this.context.rootCmsPath
      );

      if (cmsAreaName != null) {
        var actualComponents = Object.values(
          contextService.getAreaComponents(cmsAreaName, pathInPage)
        );
        return actualComponents;
      }
    }
  }

  /**
   * From the 'fullCMSPath' of a node, get just the path of the node relative to the page it is on.
   * @param {*} fullCMSPath 
   * @param {*} serverPath 
   * @param {*} rootCmsPath 
   */
  getPathInPage(fullCMSPath, serverPath, rootCmsPath) {
    var pathOfPage = this.getPathOfPage(window.location.pathname, serverPath, rootCmsPath);

    // Strip off the pathOfPage from the front.
    var pathInPage = fullCMSPath.substr(pathOfPage.length);

    dlog("gAC.window.location: " + window.location.pathname);
    dlog("gAC.rootCmsPath: " + rootCmsPath);
    dlog("gAC.fullCMSPath: " + fullCMSPath);
    dlog("gAC.pathOfPage: " + pathOfPage);
    dlog("gAC.pathInPage: " + pathInPage);

    return pathInPage;
  }

  /**
   * Get the full path of the page in the CMS.
   * @param {*} urlPath 
   * @param {*} serverPath 
   * @param {*} rootCmsPath 
   */
  getPathOfPage(urlPath, serverPath, rootCmsPath){
    var pathOfPage = urlPath;

    pathOfPage = removeFileExtension(pathOfPage);

    pathOfPage = removeTrailingSlash(pathOfPage);
    
    if (this.context.inPageEditor) {
      //If there is a server path, strip it off from the front.
      pathOfPage = pathOfPage.substr(serverPath.length);

      dlog("gAC. IN page editor");
    } else {
      pathOfPage = rootCmsPath + pathOfPage;
      dlog("gAC.not in page editor");
    }

    return pathOfPage;
  }

  addEditorHint_forArea(contextService) {
    
    if (contextService.isEditionMode()) {
      var cmsAreaName = this.props.cmsAreaName;
      if (cmsAreaName != null) {
        // Get the Area Definiiton.
        const templateId = this.props.parentTemplateID;
        const areaDefinition = contextService.getAreaDefinitionFromTemplate(
          templateId,
          cmsAreaName
        );

        // Add the Editor Hints
        var fullCMSPath = this.props.parentPath;
        let currentNode = ReactDOM.findDOMNode(this);

        //debugger;
        var editorHintHelper = new this.props.EditorHintHelper();
        editorHintHelper.addAreaHint(currentNode, areaDefinition, fullCMSPath);
      }
    }
  }

  componentDidMount() {
    //dlog("Area didMount: " + this.props.cmsAreaName)
    var contextService = new this.props.CTXService(this.context);
    this.addEditorHint_forArea(contextService);
  }

  componentDidUpdate() {
    //dlog("Area didUpdate: " + this.props.cmsAreaName)
    var contextService = new this.props.CTXService(this.context);
    this.addEditorHint_forArea(contextService);
  }

  /**
	 * Render React components for all of the objects in the context for this area.
			Wrap them in a div.
	*/
  render() {
    //dlog("Area render:" + this.props.cmsAreaName);
    var contextService = new this.props.CTXService(this.context);
    const components = this.getAreaComponents(this.props.cmsAreaName, this.props.parentPath, contextService);

    let componentElements = null;
    if (components) {
      componentElements = components.map(component =>
        instantiateReactComponent(
          component,
          this.props,
          this.context.componentMap,
          false
        )
      );
    }

    let DebugInfo = "";

    const DEBUG_MODE = false;
    if (DEBUG_MODE) {
      DebugInfo = "AREA.";
    }

    return (
      <div>
        {DebugInfo}
        {componentElements}
      </div>
    );
  }
}

export default Area;
