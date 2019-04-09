# Area51
Area51 allows mysterious alien content to take control of your React app. :alien:

**This is software in development. Alpha. Subject to frequent change. :warning:**

react-area51 enables content authors to manage the actual structure and layout of a React app, not just the content items. It was created to re-empower non-developers to create and edit React-based websites and other digital experiences. Area51 connects the modern component-architecture of React, with the component concept of CMS page editors.
It does not include an editing tool itself, but provides the infrastructure an editing UI can plug into.

Capabilities

* Use any React component without modification. They recieve all CMS-managed content passed in as `props`.
* Handles injecting 'EditorHints' into the DOM to support the editing UI of the CMS.
* Supports managing nested components.
* Supports managing a tree of 'pages'.

Note: This package is 'CMS agnostic', you can use it to hook up your own editing UI or CMS. Alternatively, use one of the CMS-specific packages based on it that implement their editing UI and content structures.

Screenshot of React Aliens Demo Project being edited in a CMS.
![Area51 Demo Project in Magnolia](/mag-aliens-demo/_dev/README-demo-project.jpg)


# How Area51 works

react-area51 provides an `Area` React component that is dynamically populated with React components and content based on a JSON configuration, typically from a CMS REST endpoint.
The configuration stores both an ordered list of React components, and their content, which will be passed as props to the instantiated React components. Because an instantiated React component may itself contain an area, the configuration can also be a tree, instead of a list.
In an edit mode, Area51 adds markup or data attributes to the Area component and its child components to allow an external tool to add an editing UI to interact with the configuration.


# How to Use Area51 in your React project

Find the Area51 library for your CMS or editor. 

(If one does not exist you will need to create one. See the following section.)

**Setup**
* Install the Area51 npm package for your CMS. For example `magnolia-react-area51`. It provides `Area` React component.
* Place `Area` components in your existing React app wherever you want externally managed components. [Example](/mag-aliens-demo/react-app/src/app/component/SlideShow.js)
* Configure these props on your Area components:
  * cmsAreaName: The name of the corresponding area in your CMS.
  * parentPath: The full path to the CMS content node that will hold the areas contents. (Typically dynamically generated.)
  * parentTemplateId: The ID of the template of the node hosting this area in your CMS.
* Create a mapping configuration file so Area51 can map the template ID's from your CMS, with the React components to be instantiated. [Example](/mag-aliens-demo/react-app/src/app/mapping.js)
* Configure the environment variables to point to your CMS instance. [Example](/mag-aliens-demo/react-app/src/environments/environment.js)
* Modify the package.json `clean` and `copy` npm scripts to deploy to your CMS location.

**Tips**
* Ensure that the CMS page template that hosts the React app has a DIV with the proper id (Usually "app" or "app-root".) (It has to match whatever is in your react app `public/index.html` file.
* You may need to adjust the Router in your React app to accept '.html' since this will probably be appended to the URL when running in the CMS.

# Creating an Area51 for your CMS or editing UI

* Install the basic `react-area51` npm package. 
* Implement two classes specificaly for your CMS or editing UI:'ContextService' and 'EditorHintHelper'.
* Export an `index.js` file that wraps the basic `Area` component with an HOC which provides your custom ContextService and EditorHintHelper. [Reference implementation](/magnolia-react-area51/src/index.js)
* Enjoy!

**ContextService**
A service that gives Area51 all it needs to operate on the CMS content that is stored in the Area51Context state.
* getAreaDefinitionFromTemplate - Return the area definition from a specific template.
* getAreaComponents - Return the components (actual content) of an area.
* getPage - Return the actual content of a page.
* getTemplate - Return the template definition.
* inEditionMode - Return whether the page is in edition mode.

[Reference implementation](/magnolia-react-area51/src/MagnoliaContextService.js)

**EditorHintHelper**
Generate the markup required for the Page Editing UI.
A CMS will usually include specific markup in the DOM so that it's Page Editor knows where to inject editing UI elements, and how they should be configured.

* addComponentHint - Add editor hints to the DOM for a component.
* addAreaHint - Add editor hints to the DOM for an area.

[Reference implementation](/magnolia-react-area51/src/MagnoliaEditorHintHelper.js)

# Technical Details :triangular_ruler:

The React application loads the JSON with the content and stores this in a React Context `Area51Context`.

The `Area` components instantiate React components using React.createComponent(), and wrap each component with an HOC `withArea51` which grabs the appropriate content from the `Area51Context` and passes it directly as `props` to the component.

`withArea51` also provides the 'EditorHints' which are included in the DOM to allow the components to be managed in the CMS. 

![Area51 Architectural Diagram](/mag-aliens-demo/_dev/README-react-area51.png)

## Technical Notes

An environment variable `REACT_APP_LOG_LEVEL` can be set to 0 or 1 to control if messages are logged to the console.


## License

MIT

### Contributors

* Adrien Manzoni, [Magnolia](https://documentation.magnolia-cms.com)
* Christopher Zimmermann, [Magnolia](https://documentation.magnolia-cms.com)
* *Your name here!* :grinning:
