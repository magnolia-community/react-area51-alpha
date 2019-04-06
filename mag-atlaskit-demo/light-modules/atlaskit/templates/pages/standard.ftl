<!doctype html>
<!-- IN THIS VERSION.
Default: Just get the content on this one page.
-->
<html lang="en">
	<head>
		<title>AtlasKit & Magnolia</title>

		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="${ctx.contextPath}/.resources/atlaskit/webresources/favicon.ico">
		
		<link rel="manifest" href="${ctx.contextPath}/.resources/atlaskit/webresources/manifest.json">

		${resfn.css("/atlaskit/webresources/static/css/main.*css")}

		[@cms.page /]


		<script>
		// templateName: ${content["mgnl:template"]}
			window.singlePageConfig = {
				templateDefinitions: ${model.getTemplateDefintionsOnOnePageJson(content["mgnl:template"])!},
				content: ${model.getPageContent(content["@path"])!}
			}

			window.inPageEditor = true;
			
		</script>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>

		<div id="root"></div>
		<div id="app-root"></div>
		${resfn.js("/atlaskit/webresources/static/js/main.*js")}
	
	
	</body>
</html>
