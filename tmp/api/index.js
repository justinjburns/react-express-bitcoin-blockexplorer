import axios from 'axios';
import { API_PATH } from './config';
import { responseSuccess, responseError } from './interceptors';

const HTTP = axios.create({
    baseURL: API_PATH
});

HTTP.interceptors.response.use(responseSuccess, responseError);

/* ============ export API endpoints ================ */

const API = {};

// GET endpoints that don't take any args
const simpleGetterEndpoints = [
    'getblockcount',
    'getbestblockhash',
    'getconnectioncount',
    'getblockchaininfo',
    'getmininginfo',
    'getpeerinfo',
];

simpleGetterEndpoints.forEach(endpoint => {
    API[endpoint] = () => HTTP.get(`/${endpoint}`);
});


API.getblock = blockhash => HTTP.get(`/getblock/${blockhash}`);

API.getblockhash = height => HTTP.get(`/getblockhash/${height}`);

API.gettransaction = txid => HTTP.get(`/gettransaction/${txid}`);


export default API;