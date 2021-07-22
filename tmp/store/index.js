import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = [thunk];
middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;