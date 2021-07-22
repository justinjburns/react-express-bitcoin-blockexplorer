// import { getState } from 'react-redux';
import API from '../api';
import { reverse, range } from 'ramda';

import {
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
} from './constants';

export const loadingstart = () => ({
    type: LOADINGSTART
});

export const loadingend = () => ({
    type: LOADINGEND
});

export const getblockcount = () => {
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

export const setblockcount = (payload) => ({
    type: SETBLOCKCOUNT,
    payload
});

export const getblocks = (blockhashes) => {
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

export const setblocks = (payload) => ({
    type: SETBLOCKS,
    payload
});



export const getblock = blockhash => dispatch => _getblock(dispatch, blockhash);

async function _getblock(dispatch, blockhash) {
    try {
        const {data: {result: block}} = await API.getblock(blockhash);
        dispatch(setblock(block));
    } catch (e) {
        console.log('error: ', e);
    }
}

export const setblock = (payload) => ({
    type: SETBLOCK,
    payload
});


export const getblockhash = (height) => dispatch => _getblockhash(dispatch, height);

async function _getblockhash(dispatch, height) {
    try {
        const {data: {result: blockhash}} = await API.getblockhash(height);
        dispatch(setblockhash(blockhash));
    } catch (e) {
        console.log('error:', e);
    }
}

export const getTransaction = (txid) => dispatch => _gettransaction(dispatch, txid);

async function _gettransaction(dispatch, txid) {
    try {
        const {data: {result: transaction}} = await API.gettransaction(txid);
        // dispatch(setTransaction(transaction));
        return transaction;
    } catch (e) {
        console.log('error:', e);
    }
}

export const setTransaction = (payload) => ({
    type: SETTRANSACTION,
    payload
});

export const getBlockFromSelectedBlockHeight = () => (dispatch, getState) => _getblockfromblockhash(dispatch, getState);

async function _getblockfromblockhash(dispatch, getState) {
    try {
        const { selectedBlockHeight } = getState();

        const {data: {result: blockhash}} = await API.getblockhash(selectedBlockHeight);
        dispatch(setblockhash(blockhash));

    
        const {data: {result: block}} = await API.getblock(blockhash);
        const height = block.height;
        
        // console.log('block==', block);
        dispatch(setselectedblock(block));
        dispatch(setSelectedBlockHeight(height));

    } catch (e) {
        console.log('error: ', e);
    }
}


export const setblockhash = (payload) => ({
    type: SETBLOCKHASH,
    payload
});


export const getbestblock = () => (dispatch, getState) => _getbestblock(dispatch, getState);

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

export const setSelectedBlockHeight = (payload) => ({
    type: SETSELECTEDBLOCKHEIGHT,
    payload
})


export const setbestblock = (payload) => ({
    type: SETBESTBLOCK,
    payload
});

export const setselectedblock = (payload) => ({
    type: SETSELECTEDBLOCK,
    payload
});

export const setblocklist = (payload) => ({
    type: SETBLOCKLIST,
    payload
});

export const getbestblockhash = () => dispatch => _getbestblockhash(dispatch);

async function _getbestblockhash(dispatch) {
    try {
        const {data: {result: bestblockhash}} = await API.getbestblockhash();
        dispatch(setbestblockhash(bestblockhash));
    } catch (e) {
        console.log('error: ', e);
    }
}

export const setbestblockhash = (payload) => ({
    type: SETBESTBLOCKHASH,
    payload
});

export const getconnectioncount = () => dispatch =>  _getconnectioncount(dispatch);

async function _getconnectioncount(dispatch) {
    try {
        const {data: {result: connectioncount}} = await API.getconnectioncount();
        dispatch(setconnectioncount(connectioncount));
    } catch (e) {
        console.log('error: ', e);
    }
}


export const setconnectioncount = (payload) => ({
    type: SETCONNECTIONCOUNT,
    payload
});

export const getblockchaininfo = () => {
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

export const setblockchaininfo = (payload) => ({
    type: SETBLOCKCHAININFO,
    payload
});

export const getmininginfo = () => {
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

export const setmininginfo = (payload) => ({
    type: SETMININGINFO,
    payload
});

export const getpeerinfo = () => {
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

export const setpeerinfo = (payload) => ({
    type: SETPEERINFO,
    payload
});
