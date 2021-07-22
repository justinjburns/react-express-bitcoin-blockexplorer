const R = require('ramda');
const {
    LOADINGSTART,
    LOADINGEND,
    SETBLOCK,
    SETSELECTEDBLOCK,
    SETSELECTEDBLOCKHEIGHT,
    SETTRANSACTION,
    SETBESTBLOCK,
    SETBLOCKS,
    SETBLOCKLIST,
    SETBLOCKHASH,
    SETBLOCKCOUNT,
    SETBESTBLOCKHASH,
    SETCONNECTIONCOUNT,
    SETBLOCKCHAININFO,
    SETMININGINFO,
    SETPEERINFO
} = require('./constants');

const defaultState = {
    loading: false,
    pageSize: 30,
    selectedBlock: null,
    selectedBlockHeight: null,
    selectedTransaction: null,
    bestblock: null,
    block: null,
    blocks: [],
    blockList: null,
    blockhash: null,
    blockcount: null,
    bestblockhash: null,
    connectioncount: null,
    blockchaininfo: null,
    mininginfo: null,
    peerinfo: null
};

function reducer (state = defaultState, { type, payload }) {
    switch(type) {
        case LOADINGSTART:
            return R.merge(state, { loading: true });
            
        case LOADINGEND:
            return R.merge(state, { loading: false });
            
        case SETBLOCK:
            return R.merge(state, { block: payload });
            
        case SETBLOCKS:
            return R.merge(state, { blocks: payload });
            
        case SETBLOCKLIST:
            return R.merge(state, { blockList: payload });
            
        case SETSELECTEDBLOCK:
            return R.merge(state, { selectedBlock: payload });
            
        case SETTRANSACTION:
            return R.merge(state, { selectedTransaction: payload });
            
        case SETSELECTEDBLOCKHEIGHT:
            return R.merge(state, { selectedBlockHeight: payload });
            
        case SETBESTBLOCK:
            return R.merge(state, { bestblock: payload });       
            
        case SETBLOCKHASH:
            return R.merge(state, { blockhash: payload });            
            
        case SETBLOCKCOUNT:
            return R.merge(state, { blockcount: payload });
            
        case SETBESTBLOCKHASH:
            return R.merge(state, { bestblockhash: payload });
            
        case SETCONNECTIONCOUNT:
            return R.merge(state, { connectioncount: payload });
            
        case SETBLOCKCHAININFO:
            return R.merge(state, { blockchaininfo: payload });
            
        case SETMININGINFO:
            return R.merge(state, { mininginfo: payload });
            
        case SETPEERINFO:
            return R.merge(state, { peerinfo: payload });
            
        default:
            return state;
    }
};

exports.reducer = reducer;