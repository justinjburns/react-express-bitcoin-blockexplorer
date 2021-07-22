// import { getState } from 'react-redux';
const { API } = require('../api');
const { reverse, range } = require('ramda');

const {
    LOADINGSTART,
    LOADINGEND,
    SETBLOCK,
    SETBESTBLOCK,
    SETSELECTEDBLOCK,
    SETSELECTEDBLOCKHEIGHT,
    SETTRANSACTION,
    SETBLOCKS,
    SETBLOCKLIST,
    SETBLOCKCOUNT,
    SETBLOCKHASH,
    SETBESTBLOCKHASH,
    SETCONNECTIONCOUNT,
    SETBLOCKCHAININFO,
    SETMININGINFO,
    SETPEERINFO,
} = require('./constants');

const setblockcount = (payload) => ({ type: SETBLOCKCOUNT, payload });
const setblocks = (payload) => ({ type: SETBLOCKS, payload });
const setblock = (payload) => ({ type: SETBLOCK, payload });
const setTransaction = (payload) => ({ type: SETTRANSACTION, payload });
const loadingstart = () => ({ type: LOADINGSTART });
const loadingend = () => ({ type: LOADINGEND });
const setblockhash = (payload) => ({ type: SETBLOCKHASH, payload });
const setSelectedBlockHeight = (payload) => ({ type: SETSELECTEDBLOCKHEIGHT, payload });
const setbestblock = (payload) => ({ type: SETBESTBLOCK, payload });
const setselectedblock = (payload) => ({ type: SETSELECTEDBLOCK, payload });
const setblocklist = (payload) => ({ type: SETBLOCKLIST, payload });
const setconnectioncount = (payload) => ({ type: SETCONNECTIONCOUNT, payload });
const setbestblockhash = (payload) => ({ type: SETBESTBLOCKHASH, payload });
const setblockchaininfo = (payload) => ({ type: SETBLOCKCHAININFO, payload });
const setmininginfo = (payload) => ({ type: SETMININGINFO, payload });
const setpeerinfo = (payload) => ({ type: SETPEERINFO, payload });

exports.setblockcount = setblockcount;
exports.setblocks = setblocks;
exports.setblock = setblock;
exports.setTransaction = setTransaction;
exports.loadingstart = loadingstart; 
exports.loadingend = loadingend;
exports.setblockhash = setblockhash;
exports.setSelectedBlockHeight = setSelectedBlockHeight;
exports.setbestblock = setbestblock;
exports.setselectedblock = setselectedblock;
exports.setblocklist = setblocklist;
exports.setconnectioncount = setconnectioncount;
exports.setbestblockhash = setbestblockhash;
exports.setblockchaininfo = setblockchaininfo;
exports.setmininginfo = setmininginfo;
exports.setpeerinfo = setpeerinfo;

exports.getblockcount = () => {
    return (dispatch) => {
        return API.getblockcount()
            .then(({data: {result}}) => {
                dispatch(setblockcount(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

exports.getblocks = (blockhashes) => {
    return (dispatch) => {
        return API.getblock(blockhashes)
            .then(({data: {result}}) => {
                dispatch(setblock(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

exports.getblock = blockhash => dispatch => _getblock(dispatch, blockhash);

async function _getblock(dispatch, blockhash) {
    try {
        const {data: {result: block}} = await API.getblock(blockhash);
        dispatch(setblock(block));
    } catch (e) {
        console.log('error: ', e);
    }
}

exports.getblockhash = (height) => dispatch => _getblockhash(dispatch, height);

async function _getblockhash(dispatch, height) {
    try {
        const {data: {result: blockhash}} = await API.getblockhash(height);
        dispatch(setblockhash(blockhash));
    } catch (e) {
        console.log('error:', e);
    }
}

exports.getTransaction = (txid) => dispatch => _gettransaction(dispatch, txid);

async function _gettransaction(dispatch, txid) {
    try {
        const {data: {result: transaction}} = await API.gettransaction(txid);
        // dispatch(setTransaction(transaction));
        return transaction;
    } catch (e) {
        console.log('error:', e);
    }
}

exports.getBlockFromSelectedBlockHeight = () => (dispatch, getState) => _getblockfromblockhash(dispatch, getState);

async function _getblockfromblockhash(dispatch, getState) {
    try {
        const { selectedBlockHeight } = getState();

        const {data: {result: blockhash}} = await API.getblockhash(selectedBlockHeight);
        dispatch(setblockhash(blockhash));

    
        const {data: {result: block}} = await API.getblock(blockhash);
        const height = block.height;
        
        dispatch(setselectedblock(block));
        dispatch(setSelectedBlockHeight(height));

    } catch (e) {
        console.log('error: ', e);
    }
}

exports.getbestblock = () => (dispatch, getState) => _getbestblock(dispatch, getState);

async function _getbestblock(dispatch, getState) {
    try {
        const {data: {result: bestblockhash}} = await API.getbestblockhash();
        dispatch(setbestblockhash(bestblockhash));
    
        const {data: {result: bestblock}} = await API.getblock(bestblockhash);
        const height = bestblock.height;
        const { pageSize } = getState();
        const blockList = reverse(range(height - pageSize, height + 1));
        
        dispatch(setblocklist(blockList));
        dispatch(setbestblock(bestblock));
        dispatch(setselectedblock(bestblock));
        dispatch(setSelectedBlockHeight(height));

    } catch (e) {
        console.log('error: ', e);
    }
}

exports.getbestblockhash = () => dispatch => _getbestblockhash(dispatch);

async function _getbestblockhash(dispatch) {
    try {
        const {data: {result: bestblockhash}} = await API.getbestblockhash();
        dispatch(setbestblockhash(bestblockhash));
    } catch (e) {
        console.log('error: ', e);
    }
}

exports.getconnectioncount = () => dispatch =>  _getconnectioncount(dispatch);

async function _getconnectioncount(dispatch) {
    try {
        const {data: {result: connectioncount}} = await API.getconnectioncount();
        dispatch(setconnectioncount(connectioncount));
    } catch (e) {
        console.log('error: ', e);
    }
}

exports.getblockchaininfo = () => {
    return (dispatch) => {
        console.log('API==', API);
        return API.getblockchaininfo()
            .then(({data: {result}}) => {
                dispatch(setblockchaininfo(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

exports.getmininginfo = () => {
    return (dispatch) => {
        return API.getmininginfo()
            .then(({data: {result}}) => {
                dispatch(setmininginfo(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};


exports.getpeerinfo = () => {
    return (dispatch) => {
        return API.getpeerinfo()
            .then(({data: {result}}) => {
                dispatch(setpeerinfo(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

