# Area51
Area51 allows mysterious alien content to take control of your React app. :alien:

**This is software in development. Alpha. Subject to frequent change. :warning:**

Area51 enables content authors to manage the actual structure and layout of a React app, not just the content items. It was created to re-empower non-developers to create and edit React-based websites and other digital experiences. Area51 connects the modern component-architecture of React, with the component concept of CMS page editors.
It does not include an editing tool itself, but provides the infrastructure an editing UI can plug into.

Capabilities

* Use any React component without modification. They get all CMS content passed in as props.
* Supports nested components.
* Supports multiple pages.

Screenshot of React Demo Project being edited in a CMS.
![Area51 Demo Project in Magnolia](mag-aliens-demo/_dev/README-demo-project.jpg)


# How Area51 works

Area51 provides an `Area` React component that is dynamically populated with React components and content based on a JSON configuration, typically from a CMS REST endpoint.
The configuration stores both an ordered list of React components, and their content, which will be passed as props to the instantiated React components. Because an instantiated React component may itself contain an area, the configuration can also be a tree, instead of a list.
In an edit mode, Area51 adds markup or data attributes to the Area component and its child components to allow an external tool to add an editing UI to interact with the configuration.
The Area51 library is CMS-agnostic, additional CMS-specific libraries can leverage it to connect to their editing UI and content structures.


# Setup
 
## How to develop these libraries and demo (or just try it out).

As the project is in rapid development, we currently host three things in this repo, two libraries (react-area51, magnolia-react-area51) & a demo project (Area51 Aliens) that shows the nested areas and multipage support in action.

### Requirements
* Java SE JDK (Tested on v1.8.0_151)
* Node (Tested on v10.15.0)
* mgnl, the Magnolia CLI (Tested on v3.0.7) (Install globally with `npm -g @magnolia/cli`.)
 
### Setup Demo on Magnolia CMS (~10 minutes)

This Git repo contains binding to a simple Magnolia CMS project for demonstration purposes.

1. Clone this git repository
2. Go into the demo project directory: `react-area51-alpha/mag-aliens-demo`.
3. Use the Magnolia CLI to install Magnolia 5.6.5+ in the directory: `mgnl jumpstart -m 5.7.2`. 
   * Choose option 3, `magnolia-community-demo-webapp` because it will configure CORS for you.
4. To easily install necessary config and sample content, copy the contents from `_dev/import-this-manually` into `apache-tomcat/webapps/magnoliaAuthor/WEB-INF/bootstrap/common 
`. (Otherwise use standard Magnolia import functionality to bring it in.)
5. Start Magnolia server:`mgnl start`, and open it in a browser: `http://localhost:8080/magnoliaAuthor/`. 
   * Username: superuser. Password: superuser.
6. Open `Pages` app. Open `solar-system`. You should see the React demo project, and be able to edit it! :boom: (This is because the React app is already deployed to `/light-modules/react-aliens/webresources/static`)




### React code (~15 minutes)
Running the React App, outside of the Page Editor - aka in 'Headless' configuration:

To work on the either of the libraries and the demo project with the comfort of live updates, you will typically want to get the source code (Currently all in this repository already.) and have three simple development servers running in three terminal tabs.

**Setup React Code:**

1. Open three terminal tabs.
2. Go to each of these directories and install the npm package:

* react-area51
  * The base library. 
  * `npm install`
* magnolia-react-area51
  * The CMS-specific library, for Magnolia.
  * `npm install`
* mag-aliens-demo/react-app
  * The demonstration project.
  * `npm install`

**TIP**: if any of your `npm install`'s has an error 'no such file or directory' with a message about '@webassemblyjs/ast' module, then try deleting the package-lock.json in that directory and running the install again.

**Running the React development setup:**

With this setup, whenever you change any file in any of the projects, the full demo will automatically rebuild.

* react-area51
  * `npm run build`
  * Runs webpack with a watch configuration.
  * Builds `./lib/ReactArea51.js`
* magnolia-react-area51
  * `npm run build`
  * Runs webpack with a watch configuration.
  * Builds `./lib/MagnoliaReactArea51.js`
* mag-aliens-demo/react-app
  * `npm start`
  * Opens running app in a browser.
  * Depends on the `MagnoliaReactArea51.js` library.
  
Now try changing any content in the Magnolia Pages app, then refresh this app and notice that it reflects your content changes! :fire:



**Deploy:**

Any code changes you make to react-app (and the libraries) must be deployed to the Magnolia instance, in order to be available in the Pages app. Deploy the app to Magnolia by running:
`npm run build`


# How to Use Area51 in your React project (When we're out of Alpha! :telescope:)

**Note: this is how it will work once we leave Alpha. For now both libraries and the demo are in this one project to facilitate experimentation and development.**

Find the Area51 library for your CMS or editor. (If one does not exist you will need to create one.)
Setup
* Install the Area51 npm package. (It provides `Area` and `Page` components.) (Not existing yet, just use a 'file' reference in the package.json)
* Place `Area` (or `Page`) components in your existing React app wherever you want externally managed components. [Example](mag-aliens-demo/react-app/src/app/component/SlideShow.js)
* Configure these props on your Area components:
  * cmsAreaName: The name of the corresponding area in your CMS.
  * parentPath: The full path to the CMS content node that will hold the areas contents. (Typically dynamically generated.)
  * parentTemplateId: The name/ID of the template of the node hosting this area in your CMS.
* Create a mapping configuration file so Area51 can map the template ID's in your CMS with the React components to be instantiated. You can use **any** React component. [Example](mag-aliens-demo/react-app/src/app/mapping.js)
* Configure the environment variables to point to your CMS instance. [Example](mag-aliens-demo/react-app/src/environments/environment.js)
* Modify the package.json `clean` and `copy` npm scripts to deploy to your CMS location.

# Known Issues :grimacing:

* When a new page, or a new component is created which contains areas, Magnolia will not create the necessary area nodes in the 'JCR' backend. Therefore when playing with the demo, you can copy an existing page, or you can go into the 'JCR Browser' app and copy area nodes from one page to a new page.
* The Magnolia Page Editor runs javascript when the page loads in order to scan the page for 'EditHints' and insert the green 'EditBars'. This means if a React app is dynamic and later shows a new component, that new component will not have green EditBars, because the component was not in the DOM at the time the Magnolia javascript ran.


## Things to improve
Not bugs, but lets improve these:
* Use real environment variables.
* Add tests.
* Make the Content JSON parsing 'pluggable'.
* Get rid of flickering when changing Routes.
* Move the mapping.js to an external file.

# Technical Details :triangular_ruler:

The React application loads the JSON with the content and stores this in a React Context `Area51Context`.

The `Area` components instantiate React components using React.createComponent(), and wrap each component with an HOC `withArea51` which grabs the appropriate content from the `Area51Context` and passes it directly as `props` to the component.

`withArea51` also provides the 'EditorHints' which are included in the DOM to allow the components to be managed in the CMS. 

![Area51 Architectural Diagram](mag-aliens-demo/_dev/README-react-area51.png)


### Contributors

* Adrien Manzoni, [Magnolia](https://documentation.magnolia-cms.com)
* Christopher Zimmermann, [Magnolia](https://documentation.magnolia-cms.com)
* *Your name here!* :grinning:
