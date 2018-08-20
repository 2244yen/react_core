import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './assets/styles/main.css';
import './assets/styles/scss/main.scss'
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import * as moment from 'moment';

window.$ = window.jQuery = $;
window.moment = moment;
require('bootstrap');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
