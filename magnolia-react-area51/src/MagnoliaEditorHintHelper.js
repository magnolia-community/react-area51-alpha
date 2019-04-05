import CommentHelper from "./CommentHelper";

/**
 * Generate the markup required for the Magnolia Page Editor.
 */
function MagnoliaEditorHintHelper() {}

/********************************   COMPONENT   *************************/

/**
 * Add the hints to the DOM.
 */
MagnoliaEditorHintHelper.prototype.addComponentHint = function(
  currentNode,
  component
) {
  /** Tag name. */
  this.tag = "cms:component";
  /** Component. */
  this.component = component;

  var commentHelper = new CommentHelper();

  commentHelper.addWrappingComments(
    this.tag,
    currentNode,
    this.beforeComponent(),
    this.after()
  );
};

/**
 * Create the 'before' component comment.
 *
 * @return The comment string
 */
MagnoliaEditorHintHelper.prototype.beforeComponent = function() {
  return (
    " " +
    this.tag +
    ' content="website:' +
    this.component["@path"] +
    '" ' +
    'dialog="' +
    this.getDialog() +
    '" ' +
    'label="' +
    this.getTitle() +
    '" ' +
    'activationStatus="2" '
  );
};

/**
 * Returns the associated dialog id (if any)
 *
 * @return The dialog id
 */
MagnoliaEditorHintHelper.prototype.getDialog = function() {
  //debugger;
  if (
    this.component.templateDefinition != null &&
    this.component.templateDefinition.dialog != null
  ) {
    return this.component.templateDefinition.dialog;
  } else {
    return "";
  }
};

/**
 * Returns the associated label (if any)
 *
 * @return The label
 */
MagnoliaEditorHintHelper.prototype.getTitle = function() {
  if (
    this.component.templateDefinition != null &&
    this.component.templateDefinition.title != null
  ) {
    return this.component.templateDefinition.title;
  } else {
    return "";
  }
};

/**
 * Create the 'after' comment.
 *
 * @return The comment string
 */
MagnoliaEditorHintHelper.prototype.after = function() {
  return " /" + this.tag + " ";
};

/********************************   AREA   *************************/

/**
 * Add the hints to the DOM.
 */
MagnoliaEditorHintHelper.prototype.addAreaHint = function(
  currentNode,
  area,
  parentPath
) {
  /** Tag name. */
  this.tag = "cms:area";
  /** Area. */
  this.area = area;

  this.parentPath = parentPath;
  var commentHelper = new CommentHelper();

  commentHelper.addWrappingComments(
    this.tag,
    currentNode,
    this.beforeArea(),
    this.after()
  );
};

/**
 * Create the 'before' area comment.
 *
 * @return The comment string
 */
MagnoliaEditorHintHelper.prototype.beforeArea = function() {
  if (!this.area) return "";

  return (
    "  " +
    this.tag +
    ' content="website:' +
    this.parentPath +
    "/" +
    this.area.name +
    '" ' +
    'name="' +
    this.area.name +
    '" ' +
    'availableComponents="' +
    this.getAvailableComponents() +
    '" ' +
    'type="' +
    this.getType() +
    '" ' +
    'label="' +
    this.getLabel() +
    '" ' +
    'inherit="false" ' +
    'optional="' +
    this.getOptional() +
    '" ' +
    'createAreaNode="' +
    this.getCreateAreaNode() +
    '" ' +
    'showAddButton="' +
    this.getShowAddButton() +
    '" ' +
    'showNewComponentArea="' +
    this.getShowNewComponentArea() +
    '" ' +
    'description="' +
    this.getDescription() +
    '" ' +
    'activationStatus="0" '
  );
};

//Return the content
MagnoliaEditorHintHelper.prototype.getAvailableComponents = function() {
  var components = "";

  if (this.area.availableComponents != null) {
    for (var key in this.area.availableComponents) {
      var component = this.area.availableComponents[key];
      components += component.id + ",";
    }

    components = components.substring(0, components.length - 1);
  }

  return components;
};

//Return the area type (default list)
MagnoliaEditorHintHelper.prototype.getType = function() {
  if (this.area.type == null) {
    return "list";
  } else {
    return this.area.type;
  }
};

//Return the area label (default name)
MagnoliaEditorHintHelper.prototype.getLabel = function() {
  if (this.area.title == null) {
    return this.area.name;
  } else {
    return this.area.title;
  }
};

//Return the optional flag (default false)
MagnoliaEditorHintHelper.prototype.getOptional = function() {
  if (this.area.optional == null) {
    return "false";
  } else {
    return "" + this.area.optional;
  }
};

//Return the create node area flag (default true)
MagnoliaEditorHintHelper.prototype.getCreateAreaNode = function() {
  if (this.area.optional == null) {
    return "true";
  } else {
    return "" + this.area.createAreaNode;
  }
};

//Return the create node area flag (default true)
MagnoliaEditorHintHelper.prototype.getShowAddButton = function() {
  return "true";
};

//Return the create node area flag (default true)
MagnoliaEditorHintHelper.prototype.getShowNewComponentArea = function() {
  return "true";
};

//Return the description
MagnoliaEditorHintHelper.prototype.getDescription = function() {
  if (this.area.optional == null) {
    return "";
  } else {
    return this.area.description;
  }
};

//Instantiate a Magnolia area helper
export default MagnoliaEditorHintHelper;
