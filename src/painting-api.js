
import axios from 'axios'

// Obtain the web api from our environment file
const apiBaseUrl = process.env.WEB_API;

/*
 * Axios provides us the ability to create a base instance. 
 * Which allows us to share a common base URL and configuration across all calls to the instance. 
 * This comes in handy if we need to share headers, such as an authorization header.
*/ 
export const API = axios.create({
    baseURL: apiBaseUrl
})