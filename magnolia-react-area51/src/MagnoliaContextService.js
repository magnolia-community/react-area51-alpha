// TODO: Make some methods private.

/**
 * Magnolia context service.
 */
function MagnoliaContextService(context) {
	this.context = context;
	if (!context){
		//All usages of the service need to pass in the context.
		console.log("MagnoliaContextService needs valid 'context'.");
	}
}

/**
 * Return the area definition from a specific template by name.
 * Works for page and component templates. Helps supporting nested areas.
 *
 * @param templateId The id of the template in the templateDefinitions configuration.
 * @param cmsAreaName The name of the area
 */
MagnoliaContextService.prototype.getAreaDefinitionFromTemplate = function(templateId, cmsAreaName){
	if (this.context.templateDefinitions) {
		let definition = this.context.templateDefinitions[templateId];

		if (definition){
			let area = definition.areas[cmsAreaName];
			return area;
		}else{
			return null;
		}
	} else {
		return null;
	}
}


/**
 * Returns the current Magnolia JCR node path.
 */
MagnoliaContextService.prototype.getCurrentNode = function() {
	return this.context.content["@path"];
}


/**
 * Return the compontents (actual content) of an area.
 *
 * @param cmsAreaName The name of the area
 * @param relativeContentPath The 'path' to the content item 'in the tree' below the CmsRootPath (the mapping point between the app and the cms.).
 */
MagnoliaContextService.prototype.getAreaComponents = function(cmsAreaName, relativeContentPath) {

	var results = [];
	if (!this.context.content){
		return results
	}

	const getNestedObject = (nestedObj, pathArr) => {
		return pathArr.reduce((obj, key) =>
			(obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
	}

	var content = this.context.content;

	if (content && typeof(content) !== "undefined") {

		var location = relativeContentPath.split("/").slice(1);
		location.push(cmsAreaName);
		dlog("getAreaComponents: location:" + JSON.stringify(location, null, 2));

		//Get ONLY the content of the current area by diving into the full content tree.
		var areaContent = getNestedObject (content, location);

		if (areaContent!=null) {
			var components = areaContent["@nodes"];

			// eslint-disable-next-line
			components.map(nodeName => {
				var value = areaContent[nodeName];

				if (typeof(value) === "object" && value["jcr:primaryType"] === "mgnl:component") {
					dlog("Error - update to the newer delivery endpoint that outputs @nodeType instead of jcr:primaryType.")
				}

				if (typeof(value) === "object" && value["@nodeType"] === "mgnl:component") {

					// Get the templateDefinition in order to get the dialog for the editor hints.
					if (this.isEditionMode()) {
						//Gets the template
						var templateId = value["mgnl:template"];
						//debugger;
						var template = this.getTemplate(templateId);
						value.templateDefinition = template;
						//console.log("CTX: def:" + templateId)
						//console.log("CTX: temp:" + JSON.stringify(template,null,2))
					}

					results.push(value);
				}
			});
    	}
	}
	return results;
}

/**
 * Return the actual content of a page.
 * (Similar to getAreaComponents)
 * Current model is that the content object always has the current page at the top.
 */
MagnoliaContextService.prototype.getPage = function() {

	return this.context.content;
}

/**
 * Return the template definition. can be a page or component template.
 *
 * @param templateId The id of the template
 */
MagnoliaContextService.prototype.getTemplate = function(templateId){
	if (this.context.templateDefinitions) {
		return this.context.templateDefinitions[templateId];
	} else {
		return null;
	}
}

/**
 * Return whether the page is in edition mode
 *
 * @return Whether the page is in edition mode
 */
MagnoliaContextService.prototype.isEditionMode = function() {

	if (!this.context){
		return false;
	} else{
		return typeof(this.context.templateDefinitions) !== "undefined";
	}
}

function dlog(message) {
    if (true){
        console.log(message);
    }
}

export default MagnoliaContextService;
