/**
 * Utility to extract components from a node.
 */
function ComponentHelperDeliveryV2() {}

/**
 *  Handle the unique Magnolia delivery endpoint JSON.
 *
 * Returns an array of the components.
 *
 * - dereference the nodes based on the @nodes array.
 * - only include nodes that have @nodeType "mgnl:component"
 * */

ComponentHelperDeliveryV2.prototype.getComponentsFromNode = function(
  areaContent
) {
  var nodeNames = areaContent["@nodes"];
  var components = [];
  nodeNames.map(function(nodeName) {
    var node = areaContent[nodeName];

    if (
      typeof node === "object" &&
      node["jcr:primaryType"] === "mgnl:component"
    ) {
      dlog(
        "Error - update to the newer delivery endpoint that outputs @nodeType instead of jcr:primaryType."
      );
    }

    if (typeof node === "object" && node["@nodeType"] === "mgnl:component") {
      components.push(node);
    }
    return null;
  }, this);

  return components;
};

export default ComponentHelperDeliveryV2;
