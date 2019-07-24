import React from "react";

import { Area } from "magnolia-react-area51";

import { dlog } from "../AppHelpers";

const SlideShow = props => {
  const { main } = props;

  dlog("render slideshow.");
  return (
    <div className="slideshow">
      <h4>{props.title}</h4>
      <div className="component-name">Slideshow</div>

      <div className="slides">
        <Area {...main} />
      </div>
    </div>
  );
};

export default SlideShow;
