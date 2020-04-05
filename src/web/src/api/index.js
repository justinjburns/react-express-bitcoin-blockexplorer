import axios from 'axios';
import { API_PATH } from './config';
import { responseSuccess, responseError } from './interceptors';

const getterEndpoints = [
    'getblockcount',
    'getbestblockhash',
    'getconnectioncount',
    'getdifficulty',
    'getblockchaininfo',
    'getmininginfo',
    'getpeerinfo',
    'getrawmempool'
];

const HTTP = axios.create({
    baseURL: API_PATH
});

HTTP.interceptors.response.use(responseSuccess, responseError);

/* ============ export API endpoints ================ */

// const API = {};

// getterEndpoints.forEach(endpoint => {
//     API[endpoint] = () => HTTP.get(`/${endpoint}`);
// });

// export default API;

export const getBlockcount = () => HTTP.get('/getblockcount');
export const getBestblockhash = () => HTTP.get('/getbestblockhash');
export const getConnectioncount = () => HTTP.get('/getconnectioncount');
export const getDifficulty = () => HTTP.get('/getdifficulty');
export const getBlockchaininfo = () => HTTP.get('/getblockchaininfo');
export const getMininginfo = () => HTTP.get('/getmininginfo');
export const getPeerinfo = () => HTTP.get('/getpeerinfo');
export const getRawmempool = () => HTTP.get('/getrawmempool');

// const API = {
//     getBlockcount,
//     getBestblockhash,
//     getConnectioncount,
//     getDifficulty,
//     getBlockchaininfo,
//     getMininginfo,
//     getPeerinfo,
//     getRawmempool
// };

// export default API;