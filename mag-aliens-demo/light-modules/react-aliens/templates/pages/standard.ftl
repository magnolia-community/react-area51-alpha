<!doctype html>
<!-- IN THIS VERSION.
Default: Just get the content on this one page.
-->
<html lang="en">
	<head>
		<title>Area51 Aliens</title>

		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="${ctx.contextPath}/.resources/react-aliens/webresources/favicon.ico">

		<link rel="manifest" href="${ctx.contextPath}/.resources/react-aliens/webresources/manifest.json">

		${resfn.css("/react-aliens/webresources/static/css/main.*css")}

		[@cms.page /]


		<script>
		window.isEditMode = true;
		window.inPageEditor = true;


[#if cmsfn.isEditMode()]
		// templateName: ${content["mgnl:template"]}
			window.singlePageConfig = {
				templateDefinitions: ${model.getTemplateDefintionsOnOnePageJson(content["mgnl:template"])!},
				content: ${model.getPageContent(content["@path"])!}
			}
[/#if]

		</script>


	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>

		<div id="root"></div>


		${resfn.js("/react-aliens/webresources/static/js/main.*js")}
[#-- In order to serve the site directly from CRA development server comment out resfn CSS and JS above... and uncomment line below --]
	<!-- <script src="http://localhost:3000/static/js/bundle.js"></script> -->

	</body>
</html>
