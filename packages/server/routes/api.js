const express = require("express");
const router = express.Router();
const request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const BTC_NODE_IP = process.env.NODE_IP;
const BTC_NODE_PORT = process.env.NODE_PORT;

const getRequestOptionsForMethod = (methodName, params = []) => {
    return {
        url: `http://${USER}:${PASS}@${BTC_NODE_IP}:${BTC_NODE_PORT}/`,
        method: "POST",
        headers: { "content-type": "text/plain;" },
        body: `{ "jsonrpc": "1.0", "method": "${methodName}", "params": ${JSON.stringify(params)}, "id": "api" }`
    };
};

const getResultCallback = ( res ) => {
    return (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.send(data);
        }
    };
};

// GET apis that take no args
const getterEndpointsNoParams = [
    'getblockcount',
    'getbestblockhash',
    'getconnectioncount',
    'getdifficulty',
    'getblockchaininfo',
    'getmininginfo',
    'getpeerinfo',
    'getrawmempool'
];

getterEndpointsNoParams.forEach((endpoint) => {
    router.get(`/${endpoint}`, (req, res) => {
        request(getRequestOptionsForMethod(endpoint), getResultCallback(res));
    });
});

router.get('/getblockhash/:height', (req, res) => {
    const options = getRequestOptionsForMethod('getblockhash', [parseInt(req.params.height)]);
    request(options, getResultCallback(res));
});

router.get('/getblock/:blockhash', (req, res) => {
    const options = getRequestOptionsForMethod('getblock', [req.params.blockhash]);
    request(options, getResultCallback(res));
});

router.get('/getblockstats/:hash_or_height', (req, res) => {
    let param = [req.params.hash_or_height];

    if (typeof req.params.hash_or_height === 'number') {
        param = [parseInt(req.params.hash_or_height)];
    }

    const options = getRequestOptionsForMethod('getblockstats', param);
    request(options, getResultCallback(res));
});

router.get('/gettransaction/:txid', (req, res) => {
    const options = getRequestOptionsForMethod('getrawtransaction', [req.params.txid, true]);
    request(options, getResultCallback(res));
});

router.get('/', (req, res, next) => {
    res.send('Bitcoin API Root');
});

module.exports = router;