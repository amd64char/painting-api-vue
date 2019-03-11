// src/main.js

import Vue from 'vue'
import App from './components/App'
import JQuery from 'jquery'
import moment from 'moment'

import 'bootstrap';
import './scss/app.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlus, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faPlus, faEdit, faSpinner);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

let $ = JQuery;
const bootbox = require('bootbox');

Vue.mixin({
    /*
     * Always use the $_ prefix for custom private properties in a mixin:
     * https://vuejs.org/v2/style-guide/#Private-property-names-essential
    */
    methods: {
        $_capitalizeFirstLetter: (str) => {
            if (typeof (str) !== 'undefined' && str !== null) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            } else {
                return '';
            } 
        },
        $_toLowerCaseAndTrim: (str) => {
            if (typeof (str) !== 'undefined' && str !== null) {
                return str.toString().trim().toLowerCase();
            } else {
                return '';
            }
        },
        $_displayError: (message) => {
            bootbox.alert(`<p>There was an error while getting data:</p><p><i>${message}</i></p>`);
        },
        $_displayMessage: (message) => {
            bootbox.alert(message);
        },
        $_formatInferredDate: (dateModified, dateCreated) => {
            return !!dateModified ? moment(dateModified).format('lll') : moment(dateCreated).format('lll');
        }
    }
})

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})