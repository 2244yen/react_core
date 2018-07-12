import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import * as moment from 'moment';

window.$ = window.jQuery = $;
window.moment = moment;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
