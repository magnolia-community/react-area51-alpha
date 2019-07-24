import React from "react";

import { dlog } from "../AppHelpers";

//import { Area } from '../react-magnolia';
import { Area } from "magnolia-react-area51";

const Standard = props => {
  const { left, right } = props;

  dlog("render PageStandard.");

  return (
    <div className="content-background">
      <div className="container">
        <h1 className="bd-title">{props.title}</h1>
        <div className="component-name">Page Standard</div>
        <div>
          <div />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Area {...left} />
          </div>
          <div className="col-xs-12 col-md-6">
            <Area {...right} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standard;
