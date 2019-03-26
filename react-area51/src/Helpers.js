import React from 'react';
import withArea51 from './withArea51';

/**
 * Instantiate a React component with the content and type of the passed object.
 * Uses the componentMap to determine which React component to create based on the templateId in the passed object.
 */
export function instantiateReactComponent(component, props, componentMap, isPage) {

    const templateId = component["mgnl:template"];
    //console.log("PAGE instantiateComponent:" + templateId);
    
    var componentClass;
    if (templateId){
        componentClass = componentMap[templateId];
    }
    
    if (componentClass!=null) {
        // This is where the components get the content from the CMS or editor service.
        const newProps = Object.assign({}, component, { "key": component["@id"] });

        const wrapped = withArea51(
            componentClass, 
            props.CTXService, 
            props.EditorHintHelper,
            isPage)

        return  React.createElement(
            wrapped,
            newProps);

    } else {
        //Fallback to creating a div.
        return React.createElement(
                "div",
                {"key": component["@id"]});
    }
}

export function dlog(message) {
    if (true){
        console.log(message);
    }
}

