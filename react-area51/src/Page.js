import React from "react";

import Area51Context from "./Area51Context";
import { instantiateReactComponent } from "./Helpers";

import { dlog } from "./Helpers";
import CommentComponent from "./comments/CommentComponent";

class Page extends React.Component {
  // Use React Context API.
  // 'this.context' now contains the context managed in Area51Context.
  static contextType = Area51Context;

  /**
   * Returns the CMS managed content of the page node itself.
   */
  getPage() {
    dlog("getPage.contentinit?" + this.context.init.toString());
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
    const page = this.getPage();

    let pageElement = null;
    if (page) {
      console.log("Page ID:");
      console.log(page["@id"]);
      pageElement = instantiateReactComponent(
        page,
        this.props,
        this.context.componentMap,
        true
      );
    }

    return (
      <div>
        {pageElement}
        <CommentComponent />
      </div>
    );
  }
}

export default Page;
