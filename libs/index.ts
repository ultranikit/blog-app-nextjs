import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { postsReducer, example } from './reducers/posts_reducer';
import { rootSaga } from './saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    postData: postsReducer,
});

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const configureStore = (initialState = example) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, initialState, bindMiddleware([sagaMiddleware]));
    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
export * from './reducers/actions';
