import React from "react";

import { Area51Context } from "react-area51";
import { Area as RawArea } from "react-area51";
import { Page as RawPage } from "react-area51";

import MagnoliaContextService from "./MagnoliaContextService";
import MagnoliaEditorHintHelper from "./MagnoliaEditorHintHelper";

/* 
This is an HOC To add the Magnoila CTX and EditorHints to the 
generic react-area51 Area component.

// This function takes a component...
*/
function withMagnoliaCTXandHints(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          CTXService={MagnoliaContextService}
          EditorHintHelper={MagnoliaEditorHintHelper}
        />
      );
    }
  };
}

const Area = withMagnoliaCTXandHints(RawArea);
const Page = withMagnoliaCTXandHints(RawPage);
export { Area51Context, Area, Page };
