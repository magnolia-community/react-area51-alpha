<!doctype html>
<!-- IN THIS VERSION.
Default: Just get the content on this one page.
-->
<html lang="en">
	<head>
		<title>Magnolia Train Station</title>

		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="${ctx.contextPath}/.resources/react-aliens/webresources/favicon.ico">
		<link href="${ctx.contextPath}/.resources/react-aliens/webresources/static/css/bootstrap337.min.css" rel="stylesheet">

		<link rel="manifest" href="${ctx.contextPath}/.resources/react-aliens/webresources/manifest.json">
		<link href="${ctx.contextPath}/.resources/react-aliens/webresources/static/css/main.css" rel="stylesheet">

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
		${resfn.js("/react-aliens/webresources/static/js/main.*js")}
	
	
	</body>
</html>
