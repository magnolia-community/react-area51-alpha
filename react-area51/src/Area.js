import React from "react";
import ReactDOM from "react-dom";

import Area51Context from "./Area51Context";
import { instantiateReactComponent } from "./Helpers";

import { dlog } from "./Helpers";

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
  getAreaComponents() {
    dlog("getAreasComponents.contentinit?" + this.context.init.toString());
    var contextService = new this.props.CTXService(this.context);
    if (this.context.content != null) {
      var cmsAreaName = this.props.cmsAreaName;

      var fullCMSPath = this.props.parentPath;

      // We just want the path to the area within the current page. (Content only stores ONE page, and ITS contents.)
      var relativeContentPath = this.getRelativePath(
        fullCMSPath,
        this.context.serverPath
      );

      if (cmsAreaName != null) {
        var actualComponents = Object.values(
          contextService.getAreaComponents(cmsAreaName, relativeContentPath)
        );
        return actualComponents;
      }
    }
  }

  getRelativePath(fullCMSPath, serverPath) {
    var pathOfPage = window.location.pathname;
    //Remove any extension.
    if (pathOfPage.lastIndexOf(".") > 0) {
      pathOfPage = pathOfPage.substr(0, pathOfPage.lastIndexOf("."));
    }
    //Remove trailing slash
    dlog("d:" + pathOfPage[pathOfPage.length - 1]);

    if (pathOfPage[pathOfPage.length - 1] == "/") {
      pathOfPage = pathOfPage.substr(0, pathOfPage.length - 1);
    }

    //debugger;
    if (this.context.inPageEditor) {
      //Strip off the server path if there is one.
      //pathOfPage = this.context.rootCmsPath + pathOfPage;
      pathOfPage = pathOfPage.substr(serverPath.length);

      dlog("gAC. IN page editor");
    } else {
      pathOfPage = this.context.rootCmsPath + pathOfPage;
      dlog("gAC.not in page editor");
    }

    // Just strip off the pathOfPage.
    var relativeContentPath = fullCMSPath.substr(pathOfPage.length);

    dlog("gAC.window.location: " + window.location.pathname);
    dlog("gAC.rootCmsPath: " + this.context.rootCmsPath);
    dlog("gAC.fullCMSPath: " + fullCMSPath);
    dlog("gAC.pathOfPage: " + pathOfPage);
    dlog("gAC.relContentpath: " + relativeContentPath);

    return relativeContentPath;
  }

  addEditorHint_forArea() {
    var contextService = new this.props.CTXService(this.context);

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
    this.addEditorHint_forArea();
  }

  componentDidUpdate() {
    //dlog("Area didUpdate: " + this.props.cmsAreaName)
    this.addEditorHint_forArea();
  }

  /**
	 * Render React components for all of the objects in the context for this area.
			Wrap them in a div.
	*/
  render() {
    //dlog("Area render:" + this.props.cmsAreaName);
    const components = this.getAreaComponents();

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
