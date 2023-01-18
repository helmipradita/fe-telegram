import { applyMiddleware, createStore } from 'redux';
import rootReducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import socketIO from 'socket.io-redux';

const store = createStore(
  rootReducers,
  applyMiddleware(
    thunk,
    logger,
    socketIO(io.connect(process.env.REACT_APP_BACKEND_API_HOST))
  )
);

export default store;
