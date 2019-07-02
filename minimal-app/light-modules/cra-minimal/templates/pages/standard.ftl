<!doctype html>

<html lang="en">
	<head>
		<title>Standard Minimal Page</title>

		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="${ctx.contextPath}/.resources/cra-minimal/webresources/favicon.ico">

		<link rel="manifest" href="${ctx.contextPath}/.resources/cra-minimal/webresources/manifest.json">

		${resfn.css("/cra-minimal/webresources/static/css/main.*css")}

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
		${resfn.js("/cra-minimal/webresources/static/js/main.*js")}

		${resfn.js("/cra-minimal/webresources/static/js/.*js")}


	</body>
</html>
