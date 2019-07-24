import React from "react";
import ReactDOM from "react-dom";
//import config from './magnolia.config';
//import config from './mapping';
import MagnoliaConfigContext from "./MagnoliaConfigContext";

const getParent = parentPath => {
  const content = window.singlePageConfig.content;

  parentPath = parentPath.split("/");
  parentPath.shift();
  parentPath.pop();

  if (parentPath.length > 0) {
    let property = content;

    for (let i = 0; i < parentPath.length; i++) {
      property = property[parentPath[i]];
    }

    return property;
  } else if (parentPath.length === 0) {
    return content;
  }
};

const getAvailableComponents = components => {
  if (!components) return "";

  let string = "";

  Object.keys(components).forEach(c => {
    string += components[c].id + ",";
  });

  return string.slice(0, string.length - 1);
};

const getComponentComment = node => {
  const templateDefinitions = window.singlePageConfig.templateDefinitions;
  const content = `content="website:${node["@path"]}"`;
  const dialog = `dialog="${
    templateDefinitions[node["mgnl:template"]].dialog
  }"`;
  const label = `label="${templateDefinitions[node["mgnl:template"]].title}"`;

  return ` cms:component ${content} ${dialog} ${label} activationStatus="2" `;
};

const getAreaComment = node => {
  const parent = getParent(
    node["@path"].replace(window.singlePageConfig.content["@path"], "")
  );
  const area =
    window.singlePageConfig.templateDefinitions[parent["mgnl:template"]].areas[
      node["@name"]
    ];
  let comment = "";

  if (area) {
    const content = `content="website:${node["@path"]}"`;
    const name = `name="${area.name}"`;
    const availableComponents = `availableComponents="${getAvailableComponents(
      area.availableComponents
    )}"`;
    const type = `type="${area.type ? area.type : "list"}"`;
    const label = `label="${area.title ? area.title : area.name}"`;
    const optional = `optional="${area.optional ? area.optional : "false"}"`;
    const createAreaNode = `createAreaNode="${
      area.optional ? area.createAreaNode : "true"
    }"`;
    const description = `description=${area.optional ? area.description : ""}`;

    comment += `${content} ${name} ${availableComponents} ${type} ${label} inherit="false" ${optional} ${createAreaNode} showNewComponentArea="true" showAddButton="true" ${description} activationStatus="0"`;
  }

  return ` cms:area ${comment}`;
};

const insertComments = (node, before, after) => {
  node.parentNode.insertBefore(document.createComment(before), node);
  node.parentNode.insertBefore(document.createComment(after), node.nextSibling);
};

class Page extends React.Component {
  static contextType = MagnoliaConfigContext;
  componentDidMount() {
    //insertComments(ReactDOM.findDOMNode(this), 'cms:page', '/cms:page');
  }

  render() {
    let config = this.context;

    //debugger;
    const props = this.props;
    const template = config.templates[props["mgnl:template"]];

    return template ? React.createElement(template, props) : null;
  }
}

class Component extends React.Component {
  static contextType = MagnoliaConfigContext;
  componentDidMount() {
    if (window.isEditMode)
      insertComments(
        ReactDOM.findDOMNode(this),
        getComponentComment(this.props),
        "/cms:component"
      );
  }

  render() {
    let config = this.context;
    const props = this.props;
    const template = config.templates[props["mgnl:template"]];

    return template ? React.createElement(template, props) : null;
  }
}

class Area extends React.Component {
  static contextType = MagnoliaConfigContext;
  componentDidMount() {
    if (window.isEditMode)
      insertComments(
        ReactDOM.findDOMNode(this),
        getAreaComment(this.props),
        "/cms:area"
      );
  }

  render() {
    let config = this.context;
    const props = this.props;
    const { getChildren, templates } = config;
    const template = templates[props["mgnl:template"]];
    const nodes = getChildren
      ? getChildren(props)
      : props["@nodes"].map(node => props[node]);

    return template || nodes ? (
      template ? (
        React.createElement(template, props)
      ) : (
        <div>
          {nodes.map(node => {
            switch (node["@nodeType"]) {
              case "mgnl:component":
                return <Component key={node["@id"]} {...node} />;
              case "mgnl:area":
                return <Area key={props["@id"]} {...props} />;
              default:
                return null;
            }
          })}
        </div>
      )
    ) : null;
  }
}

export { Page, Area, Component };
