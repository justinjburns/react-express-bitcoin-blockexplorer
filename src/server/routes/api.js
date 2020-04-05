const express = require("express");
const router = express.Router();
const request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const BTC_NODE_IP = process.env.NODE_IP;
const BTC_NODE_PORT = process.env.NODE_PORT;

const getRequestOptionsForMethod = (methodName, params = []) => ({
    url: `http://${USER}:${PASS}@${BTC_NODE_IP}:${BTC_NODE_PORT}/`,
    method: "POST",
    headers: { "content-type": "text/plain;" },
    body: `{ "jsonrpc": "1.0", "method": "${methodName}", "params":${JSON.stringify(params)} , "id": "api" }`
});

const getResultCallback = ( res ) => {
    return (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.send(data);
        }
    };
}

const endpoints = [
    'getblockcount',
    'getbestblockhash',
    'getconnectioncount',
    'getdifficulty',
    'getblockchaininfo',
    'getmininginfo',
    'getpeerinfo',
    'getrawmempool'
]

endpoints.forEach((endpoint) => {
    router.get(`/${endpoint}`, (req, res) => {
        request(getRequestOptionsForMethod(endpoint), getResultCallback(res));
    });
})

router.get('/', (req, res, next) => {
    res.send('Bitcoin API Root');
});

module.exports = router;