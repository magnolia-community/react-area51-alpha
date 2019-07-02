# Area51 - Minimal Example.

# Setup

## How to develop these libraries and demo (or just try it out).

As the project is in rapid development, we currently host three things in this repo, two libraries (react-area51, magnolia-react-area51) & a demo project (Area51 Aliens) that shows the nested areas and multipage support in action.

### Requirements

- Java SE JDK (Tested on v1.8.0_151)
- Node (Tested on v10.15.0)
- mgnl, the Magnolia CLI (Tested on v3.0.7) (Install globally with `npm -g @magnolia/cli`.)

### Setup Demo on Magnolia CMS (~10 minutes)

This Git repo contains binding to a simple Magnolia CMS project for demonstration purposes.

1. Clone this git repository
2. Go into the demo project directory: `react-area51-alpha/mag-aliens-demo`.
3. Use the Magnolia CLI to install Magnolia 5.6.5+ in the directory: `mgnl jumpstart -m 5.6.5`.
   - Choose option 3, `magnolia-community-demo-webapp` because it will configure CORS for you.
4. To easily install necessary config and sample content, copy the contents from `_dev/import-this-manually` into `apache-tomcat/webapps/magnoliaAuthor/WEB-INF/bootstrap/common`. (Otherwise use standard Magnolia import functionality to bring it in.)
5. Start Magnolia server:`mgnl start`, and open it in a browser: `http://localhost:8080/magnoliaAuthor/`.
   - Username: superuser. Password: superuser.
6. Open `Pages` app. Open `cra-minimal`. You should see the React demo project, and be able to edit it! :boom: (This is because the React app is already deployed to `/light-modules/cra-minimal/webresources/static`)

### React code (~15 minutes)

Running the React App, outside of the Page Editor - aka in 'Headless' configuration:

To work on the either of the libraries and the demo project with the comfort of live updates, you will typically want to get the source code (Currently all in this repository already.) and have three simple development servers running in three terminal tabs.

**Setup React Code:**

1. Open three terminal tabs.
2. Go to each of these directories and install the npm package:

- react-area51
  - The base library.
  - `npm install`
- magnolia-react-area51
  - The CMS-specific library, for Magnolia.
  - `npm install`
- minimal-app/react-app
  - The demonstration project.
  - `npm install`

**TIP**: if any of your `npm install`'s has an error 'no such file or directory' with a message about '@webassemblyjs/ast' module, then try deleting the package-lock.json in that directory and running the install again.

**Running the React development setup:**

With this setup, whenever you change any file in any of the projects, the full demo will automatically rebuild.

- minimal-app/cra-minimal-app

  - `npm start`
  - Opens running app in a browser.
  - Depends on the `MagnoliaReactArea51.js` library.
  - Based on Create-React-App 2.\*

- (Optionally)
  - react-area51
    - `npm run build`
    - Runs webpack with a watch configuration.
    - Builds `./lib/ReactArea51.js`
  - magnolia-react-area51
    - `npm run build`
    - Runs webpack with a watch configuration.
    - Builds `./lib/MagnoliaReactArea51.js`

Now try changing any content in the Magnolia Pages app, then refresh this app and notice that it reflects your content changes! :fire:

**Deploy:**

Any code changes you make to react-app (and the libraries) must be deployed to the Magnolia instance, in order to be available in the Pages app. Deploy the app to Magnolia by running:
`npm run build`

Then delete the directory /light-modules/cra-minimal/webresources/static/js.

Then copy the directory /cra-minimal-app/build/static/js into that light-module directory.

**Working on Page Editor Hints in Dev mode**
In order to see the the page editor hints generated while in CRA development mode, you need to use some test local data JSON files, instead of connecting to the CMS endpoints. You can do this in the demo project at `minimal-app/cra-minimal-app/App.js` by setting `USE_SAMPLE_DATA` to `true`.
