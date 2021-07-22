const axios = require('axios');
const { API_PATH } = require('./config');
const { responseSuccess, responseError } = require('./interceptors');

const HTTP = axios.create({
    baseURL: API_PATH
});

HTTP.interceptors.response.use(responseSuccess, responseError);

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
    exports[endpoint] = () => HTTP.get(`/${endpoint}`);
});


exports.getblock = blockhash => HTTP.get(`/getblock/${blockhash}`);

exports.getblockhash = height => HTTP.get(`/getblockhash/${height}`);

exports.gettransaction = txid => HTTP.get(`/gettransaction/${txid}`);