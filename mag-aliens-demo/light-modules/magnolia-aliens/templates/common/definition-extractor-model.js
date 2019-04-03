var DefinitionExtractor = function () {
    
    /**
     * Extract the definition from the registry.
     *
     * @param templateId
     *            The definition id.
     * @return The definition
     */
    this.getTemplateDefinition = function(templateId) {
        return templateRegistry.getProvider(templateId).get();
    }
	
    /**
     * Return all the areas defined in a page or component definition.
     *
     * @param templateId
     *            The template id
     */
    this.getAreaDefinitions = function(templateId) {
        var areas = null;
        
        var definition = this.getTemplateDefinition(templateId);
        if (definition !== null) {
        	areas = definition.getAreas();
        }

        return areas;
    }
    
    /**
     * Return the JSON representation of all areas defined on a page template definition
     *
     * @param templateId
     *            The template id
     */
    this.getAreaDefinitionsJson = function(templateId) {
        return this.toJson(this.getAreaDefinitions(templateId));
    }

    

    this.getAllCTs = function(ctName) {
        return templateRegistry.getAllDefinitions();
    }
    /**
     * Return the JSON representation of all components defined
     * TODO!
     */
    this.getAllComponentDefinitionsJson = function() {
    	var HashMap = Java.type("java.util.HashMap");
    	var MapUtils = Java.type("org.apache.commons.collections4.MapUtils");
        var components = new HashMap();
        //var areas = this.getAreaDefinitions(templateName);

        var templates = templateRegistry.getAllDefinitions();

        var i=0;
        templates.forEach(function(template){
            i++;
            //const id = template.getName();
            components.put(i, template);
            // if (id.indexOf(':components/') > -1){
            //     //components.put(id, this.getTemplateDefinition(id));
            // }
        })

        // if (templates.length > 0) {
        //     // Browse all templates, and extract only the components based on path.
        //     for each (var template in templates) {
        //         if (template.id.indexOf(':components/')>-1)
        //             components.put(id, this.getTemplateDefinition(id));
        //         }
        //     }
        // }

        return this.toJson(components);
    }
    
    /**
     * Extract the page content.
     *
     * @param pageName
     *            The page name
     * @return The page content
     */
    this.getPageContent = function(pageName) {
		var url = ctx.request.scheme + "://" + ctx.request.serverName + ":" + ctx.request.serverPort + ctx.contextPath;
		var response = this.httpGet(url + "/.rest/delivery/pages/v1/" + pageName);
        
        return response.data;
    }

    /**
     * Find the top ancestor of this page, 
     * Then retrive its full content tree including all its child pages.
     * 
     * This is for the GetEverything approach to routing and such.
     *
     * @param pageName
     *            The page name
     * @return The page content
     */
    this.getContent_FullTreeFromTopAncestor = function(pageName) {
        var rootPageName = pageName.substring(0, pageName.indexOf('/'));
		
        var url = ctx.request.scheme + "://" + ctx.request.serverName + ":" + ctx.request.serverPort + ctx.contextPath;
		var response = this.httpGet(url + "/.rest/delivery/pages/v1/" + rootPageName);
        
        return response.data;
    }





    
    /**
     * To JSON.
     *
     * @param object
     * @return The json string representation
     */
    this.toJson = function(object) {
    	var ObjectMapper = Java.type("com.fasterxml.jackson.databind.ObjectMapper");
    	var MapperFeature = Java.type("com.fasterxml.jackson.databind.MapperFeature");
    	var JsonAutoDetect = Java.type("com.fasterxml.jackson.annotation.JsonAutoDetect");
    
    	// Get the object mapper
        var mapper = new ObjectMapper();

        // Get serialization config
        var serializationConfig = mapper.getSerializationConfig();

        // Don't fail on empty beans
        mapper.configure(MapperFeature.AUTO_DETECT_FIELDS, false);

        // Set visibilities
        mapper.setVisibility(
                serializationConfig.getDefaultVisibilityChecker()
                		.withFieldVisibility(JsonAutoDetect.Visibility.NONE)
                        .withGetterVisibility(JsonAutoDetect.Visibility.PUBLIC_ONLY)
                        .withSetterVisibility(JsonAutoDetect.Visibility.PUBLIC_ONLY)
                        .withCreatorVisibility(JsonAutoDetect.Visibility.NONE));

        return mapper.writeValueAsString(object);
    }
    
    this.httpGet = function(theUrl){
        var con = new java.net.URL(theUrl).openConnection();
        con.requestMethod = "GET";

        return this.asResponse(con);
    }
    
    this.asResponse = function(con){
        var d = this.read(con.inputStream);
        
        return {data : d, statusCode : con.responseCode};
    }
    
    this.read = function(inputStream){
        var inReader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
        var inputLine;
        var response = new java.lang.StringBuffer();

        while ((inputLine = inReader.readLine()) != null) {
               response.append(inputLine);
        }
        inReader.close();
        return response.toString();
    }


/**
     * Return the JSON representation of all components referenced on one page template.
     *
     * @param templateName
     *            The template name
     */
    this.getAllPossibleCompDefsOnATemplateJson = function(templateName) {
        var components = getAllPossibleCompDefsOnATemplate(templateName)
  
        return this.toJson(components);
    }

    this.getAllPossibleCompDefsOnATemplateRECURSE = function(templateId, components) {

        var areas = this.getAreaDefinitions(templateId);
        var def;

        var MapUtils = Java.type("org.apache.commons.collections4.MapUtils");

        if (MapUtils.isNotEmpty(areas)) {
            // Browse all area, and extract only once the related defined components
            for each (var area in areas.values()) {
                var availableComponents = area.getAvailableComponents();
                if (MapUtils.isNotEmpty(availableComponents)) {
                	for each (var availableComponent in availableComponents.values()) {
                        var id = availableComponent.getId();

                        // If not already loaded
                        if (!components.containsKey(id)) {
                            def = this.getTemplateDefinition(id);
                            components.put(id, def);

                            // (Recurse) Handle nested components - ie does the component have an area?
                            this.getAllPossibleCompDefsOnATemplateRECURSE(id, components)
                        }
                    }
                }
            }
        }
    }

    this.getAllPossibleCompDefsOnATemplate = function(templateId) {
    	var HashMap = Java.type("java.util.HashMap");
    	
        var components = new HashMap();
        this.getAllPossibleCompDefsOnATemplateRECURSE(templateId, components)

        return components;
    }


    /**
     * Return the JSON representation of the current page, and all 
     * the possible components on the apge.
     * (defined on a page template defintion)
     *
     * @param templateName
     *            The template name
     */
    this.getTemplateDefintionsOnOnePageJson = function(templateName) {
        // var HashMap = Java.type("java.util.HashMap");
    	// var MapUtils = Java.type("org.apache.commons.collections4.MapUtils");
        // var components = new HashMap();
  
        var components = this.getAllPossibleCompDefsOnATemplate(templateName)

        // Add the template definition.
        var definition = this.getTemplateDefinition(templateName);
        if (definition !== null) {
        	components.put(templateName, definition);
        }
  
        return this.toJson(components);
        //return JSON.stringify(this.toJson(components), null, 2);;
    }
    
};


new DefinitionExtractor();