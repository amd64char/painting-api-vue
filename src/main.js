// src/main.js

import Vue from 'vue'
import App from './components/App'
import JQuery from 'jquery'
import moment from 'moment'
import 'bootstrap';
import './scss/app.scss';

let $ = JQuery;
const bootbox = require('bootbox');

Vue.mixin({
    methods: {
        capitalizeFirstLetter: (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1); 
        },
        displayError: (message) => {
            bootbox.alert(`<p>There was an error while getting data:</p><p><i>${message}</i></p>`);
        },
        displayMessage: (message) => {
            bootbox.alert(message);
        },
        formatInferredDate: (dateModified, dateCreated) => {
            return !!dateModified ? moment(dateModified).format('lll') : moment(dateCreated).format('lll');
        }
    }
})

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})