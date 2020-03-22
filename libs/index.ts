import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { postsReducer , example} from './reducers/posts_reducer';
import { rootSaga } from './saga';

const rootReducer = combineReducers({
    post_data: postsReducer
});

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
};

function configureStore(initialState = example) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );

    (store as any).sagaTask = sagaMiddleware.run(rootSaga);

    return store
}

export default configureStore;
export * from './reducers/actions';
