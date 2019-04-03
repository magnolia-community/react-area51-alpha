/*
Prevent create-react-app from 'chunking' the js. Because chunking makes it hard to automatically include in Magnolia freemarker script.
Change the create-react-app config without 'ejecting'.

From this thread: https://github.com/facebook/create-react-app/issues/5306
*/
'use strict';

const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

config.optimization.splitChunks = {
    cacheGroups: {
        default: false,
    },
};

config.optimization.runtimeChunk = false;


