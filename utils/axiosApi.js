import axios from 'axios'
import base64 from "react-native-base64";
import khorConfig from "../screens/nom035/estructura/initial_config.json";
import {store} from "../redux/store";

let config =
    {
        baseURL:'https://eco_amc.khor.mx/',
        //baseURL: 'https://kupodex.com/',
        headers: {
            'Accept': 'application/json',
        }
    };


let APIKit = axios.create(config);
const token = base64.encode(khorConfig.clave_eco);

    APIKit.interceptors.request.use(async function(config) {
        try {
            config.headers.Authorization = `Basic ${token}`;
        } catch(e) {
            console.log("Error->",e.error)
        }
        return config;
    });

    APIKit.interceptors.response.use(function(config) {
        //console.log("response",config)
        return config;
    });





export default APIKit;