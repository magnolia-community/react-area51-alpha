import React from "react";
import ReactDOM from "react-dom";
import Area51Context from "./Area51Context";

/* This is an HOC that can be used to make any React component 
"content managed" with a CMS / Page Editor.

It sets the Area51Context.
It adds EditorHints when in a content editor.

Note that the content from the CMS is passed to the component
by the Area when it instantiates it. That is not happening in this function.
*/

// This function takes a component, and a CTXService, and an EditorHintHelper...
function withArea51(WrappedComponent, CTXService, EditorHintHelper, isPage) {
  // ...and returns another component...
  return class extends React.Component {
    // Use React Context API.
    // 'this.context' now contains the context managed in Area51Context.
    // This enables the managed content to be passed into the components (For the PageEditor hints in this case.).
    static contextType = Area51Context;

    addEditorHint_forComponent() {
      var contextService = new CTXService(this.context);
      if (contextService.isEditionMode() && this.props != null) {
        let currentNode = ReactDOM.findDOMNode(this);
        console.log("AEH:" + currentNode);
        
        var editorHintHelper = new EditorHintHelper();

        editorHintHelper.addComponentHint(currentNode, this.props);
      }
    }

    componentDidMount() {
      if (!isPage) {
        this.addEditorHint_forComponent();
      }
    }
    componentDidUpdate() {
      if (!isPage) {
        this.addEditorHint_forComponent();
      }
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through all props.
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withArea51;
