# Atlaskit starter

This is a basic app which includes some Atlaskit components, built on top of [create-react-app](https://github.com/facebookincubator/create-react-app). You can use this as a starting point for your next ADG3-themed project.

A live demo is available at [http://atlaskit-starter.surge.sh/](http://atlaskit-starter.surge.sh/)

## Getting started

Please make sure you have [node](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/docs/install) installed in your system.

Please run the following commands to clone the project, install dependencies and start the application.

```bash
git clone https://bitbucket.org/atlassian/atlaskit-starter.git   # clone the project
yarn install  # install dependencies
yarn start  # start the project
```

## Using more Atlaskit components

This repo ships with some of the Atlaskit components such as `@atlaskit/navigation` and `@atlaskit/avatar`.

You can add other components (listed at [https://atlaskit.atlassian.com/](https://atlaskit.atlassian.com/)) to your project. To see an exmaple in order to add button in your project run:

```bash
yarn add @atlaskit/button
```

Then in the relevant React component file (e.g. `src/App.jsx`) do the following:

```js
import Button from '@atlaskit/button';

// ...

render() {
  <Page>
    <Button>My button text</Button>
  </Page>
}
```

## Want some help?

This repository is helpful for people using Atlaskit + React for the first time. If you find a bug or require an improvement, please report it:

If you are an Atlassian employee please use this [link](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) to raise the ticket and mention 'Atlaskit-starter' as component in the issue.

If you are an external contributor please click [here](https://bitbucket.org/atlassian/atlaskit-mk-2/issues/new) to raise an issue in atlaskit-mk-2 repository and mention 'Atlaskit-starter' as component in the issue.

## Demo

![Screenshot](https://i.imgur.com/p4N266G.gif)
