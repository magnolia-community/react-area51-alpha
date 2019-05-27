import React, { Component } from "react";
import { Route } from "react-router-dom";

import { dlog } from "../AppHelpers";

import Row from "./Row";

class PageStandard extends Component {
  /**
   * Render component
   */
  render() {
    let parentTemplateID = this.props["mgnl:template"];
    let parentPath = this.props["@path"];

    var row1 = [
      {
        className: "col-xs-12 col-md-6",
        parentPath: parentPath,
        cmsAreaName: "left",
        parentTemplateID: parentTemplateID
      },
      {
        className: "col-xs-12 col-md-6",
        parentPath: parentPath,
        cmsAreaName: "right",
        parentTemplateID: parentTemplateID
      }
    ];

    var row2 = [
      {
        className: "col-xs-12",
        parentPath: parentPath,
        cmsAreaName: "schedule",
        parentTemplateID: parentTemplateID
      }
    ];

    var row3 = [
      {
        className: "col-xl-12",
        parentPath: parentPath,
        cmsAreaName: "comments",
        parentTemplateID: parentTemplateID
      }
    ];

    dlog("render PageStandard.");

    return (
      <div className="content-background">
        <div className="container">
          <h1 className="bd-title">{this.props.title}</h1>
          <div className="component-name">Page Standard</div>
          <div>
            <div>
              <Route path="/dashboard(.html)?/" />
            </div>
          </div>

          <Row columns={row1} />
          <Row columns={row2} />
          <Row columns={row3} />
        </div>
      </div>
    );
  }
}

export default PageStandard;
