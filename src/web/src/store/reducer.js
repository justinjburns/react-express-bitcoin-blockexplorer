import * as R from 'ramda';
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

const defaultState = {
    loading: false,

    // getters
    blockcount: 0,
    bestblockhash: null,
    connectioncount: null,
    difficulty: 0,
    blockchaininfo: null,
    mininginfo: null,
    peerinfo: null,
    rawmempool: null
};

const reducer = (state = defaultState, { type, payload }) => {
    switch(type) {
        case LOADINGSTART:
            return R.merge(state, { loading: true });
        case LOADINGEND:
            return R.merge(state, { loading: false });

        case SETBLOCKCOUNT:
            return R.merge(state, { blockcount: payload });
        case SETBESTBLOCKHASH:
            return R.merge(state, { bestblockhash: payload });
        case SETCONNECTIONCOUNT:
            return R.merge(state, { connectioncount: payload });
        case SETDIFFICULTY:
            return R.merge(state, { difficulty: payload });
        case SETBLOCKCHAININFO:
            return R.merge(state, { blockchaininfo: payload });
        case SETMININGINFO:
            return R.merge(state, { mininginfo: payload });
        case SETPEERINFO:
            return R.merge(state, { peerinfo: payload });
        case SETRAWMEMPOOL:
            return R.merge(state, { rawmempool: payload });
        default:
            return state;
    }
};

export default reducer;