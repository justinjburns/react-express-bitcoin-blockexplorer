const { createStore, applyMiddleware } = require('redux');
const reducer = require('./reducer').reducer;
const thunk = require('redux-thunk').default;
const logger = require('redux-logger').default;

const middleware = [thunk];
middleware.push(logger);

module.exports = createStore(reducer, applyMiddleware(...middleware));