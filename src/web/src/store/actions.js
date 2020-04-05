import * as API from '../api';

import {
    LOADINGSTART,
    LOADINGEND,
    SETBLOCKCOUNT,
    SETBESTBLOCKHASH,
    SETCONNECTIONCOUNT,
    SETDIFFICULTY,
    SETBLOCKCHAININFO,
    SETMININGINFO,
    SETPEERINFO,
    SETRAWMEMPOOL
} from './constants';
// const API = require('../api');

export const loadingstart = () => ({
    type: LOADINGSTART
});

export const loadingend = () => ({
    type: LOADINGEND
});

export const getblockcount = () => {
    return (dispatch) => {
        return API.getBlockcount()
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

export const getbestblockhash = () => {
    return (dispatch) => {
        return API.getBestblockhash()
            .then(({data: {result}}) => {
                dispatch(setbestblockhash(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

export const setbestblockhash = (payload) => ({
    type: SETBESTBLOCKHASH,
    payload
});

export const getconnectioncount = () => {
    return (dispatch) => {
        return API.getConnectioncount()
            .then(({data: {result}}) => {
                dispatch(setconnectioncount(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

export const setconnectioncount = (payload) => ({
    type: SETCONNECTIONCOUNT,
    payload
});

export const getdifficulty = () => {
    return (dispatch) => {
        return API.getDifficulty()
            .then(({data: {result}}) => {
                dispatch(setdifficulty(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

export const setdifficulty = (payload) => ({
    type: SETDIFFICULTY,
    payload
});

export const getblockchaininfo = () => {
    return (dispatch) => {
        console.log('API==', API);
        return API.getBlockchaininfo()
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
        return API.getMininginfo()
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
        return API.getPeerinfo()
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

export const getrawmempool = () => {
    return (dispatch) => {
        return API.getRawmempool()
            .then(({data: {result}}) => {
                dispatch(setrawmempool(result));
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }
};

export const setrawmempool = (payload) => ({
    type: SETRAWMEMPOOL,
    payload
});
