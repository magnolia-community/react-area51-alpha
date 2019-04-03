import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

//import registerServiceWorker from './registerServiceWorker';
import './css/bootstrap.min.css';
import './index.css';


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

//If we want to do the PWA thing.
//registerServiceWorker();
