import React from "react";
import ReactDOM from "react-dom";

import Area51Context from "./Area51Context";
import { instantiateReactComponent } from "./Helpers";

import { dlog, removeFileExtension, removeTrailingSlash } from "./Helpers";

/**
 * An Area component enables 'areas' of a React application to be managed in other systems.
 * It does two things.
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
   * ASSUMPTION, that areas have their own nodes in the content structure.
   *
   * @param {*} cmsAreaName The name of the area in the CMS.
   * @param {*} fullCmsPath The full path to the parent node of the area, in the CMS.
   * @param {*} contextService The context service for this CMS.
   */
  getAreaComponents(cmsAreaName, fullCmsPath, contextService) {
    dlog("getAreasComponents.contentinit?" + this.context.init.toString());

    if (!this.context.content) {
      return;
    }

    // We just want the path to the area within the current page. (Content only stores ONE page, and ITS contents.)
    var pathInPage = this.getPathInPage(
      fullCmsPath,
      window.location.pathname,
      this.context.serverPath,
      this.context.rootCmsPath,
      this.context.inPageEditor
    );

    if (cmsAreaName != null) {
      var areaComponents = contextService.getAreaComponents(
        cmsAreaName,
        pathInPage
      );
      if (areaComponents) {
        var actualComponents = Object.values(areaComponents);
      }
      return actualComponents;
    }
  }

  /**
   * From the 'fullCmsPath' of a node, get just the path of the node relative to the page it is on.
   * @param {*} fullCmsPath
   * @param {*} serverPath
   * @param {*} rootCmsPath
   */
  getPathInPage(fullCmsPath, urlPath, serverPath, rootCmsPath, inPageEditor) {
    var pathOfPage = this.getPathOfPage(
      urlPath,
      serverPath,
      rootCmsPath,
      inPageEditor
    );

    // Strip off the pathOfPage from the front.
    var pathInPage = fullCmsPath.substr(pathOfPage.length);

    dlog("gAC.window.location: " + window.location.pathname);
    dlog("gAC.rootCmsPath: " + rootCmsPath);
    dlog("gAC.fullCmsPath: " + fullCmsPath);
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
  getPathOfPage(urlPath, serverPath, rootCmsPath, inPageEditor) {
    var pathOfPage = urlPath;

    pathOfPage = removeFileExtension(pathOfPage);

    pathOfPage = removeTrailingSlash(pathOfPage);

    if (inPageEditor) {
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
    if (!contextService.isEditionMode()) {
      return;
    }

    var cmsAreaName = this.props.cmsAreaName;
    if (!cmsAreaName) {
      return;
    }

    // Get the Area Definiiton.
    const templateId = this.props.parentTemplateID;
    const areaDefinition = contextService.getAreaDefinitionFromTemplate(
      templateId,
      cmsAreaName
    );

    // Add the Editor Hints
    var fullCmsPath = this.props.parentPath;
    let currentNode = ReactDOM.findDOMNode(this);

    var editorHintHelper = new this.props.EditorHintHelper();
    editorHintHelper.addAreaHint(currentNode, areaDefinition, fullCmsPath);
  }

  componentDidMount() {
    var contextService = new this.props.CTXService(this.context);
    this.addEditorHint_forArea(contextService);
  }

  componentDidUpdate() {
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
    const components = this.getAreaComponents(
      this.props.cmsAreaName,
      this.props.parentPath,
      contextService
    );

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
