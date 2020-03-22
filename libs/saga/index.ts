import {take, put, all} from 'redux-saga/effects';
import axios from 'axios';

import * as action_type from '../reducers/actions';
import * as type from '../reducers/posts_reducer/types';

const url: string = 'https://simple-blog-api.crew.red/posts/';

// Sagas
function* getPostsDataSaga() {
    while (true) {
        yield take(type.SET_POSTS_DATA);
        const response = yield axios.get(url);
        yield put(action_type.getPostsData(response.data))
    }
}

function* getPostSaga() {
    while (true) {
        const {payload} = yield take(type.GET_SINGLE_POST);
        const url = `https://simple-blog-api.crew.red/posts/${payload}?_embed=comments`;
        const response = yield axios.get(url).then(res => res)
            .catch(error => error);

        if (response.status === 200) {
            yield put(action_type.getSinglePost(response.data))
        } else {
            const message = 'Your link is bad, check it again please!';
            yield all([
                put(action_type.responseMessage(message)),
                put(action_type.onFail())
            ])
        }
    }
}

function* addPostSaga() {
    while (true) {
        const {payload} = yield take(type.ADD_NEW_POST);
        const response = yield axios.post(url, {...payload}).then(res => res)
            .catch(error => error);

        if (response.status === 201) {
            yield all([
                yield put(action_type.addNewPost(response.data)),
                yield put(action_type.responseMessage('Post successful created!')),
                yield put(action_type.onSuccess())
            ])
        } else {
            const message = 'Something goes wrong try again later!';
            yield all([
                put(action_type.responseMessage(message)),
                put(action_type.onFail())
            ])
        }
    }
}

function* deletePostSaga() {
    while (true) {
        const { payload } = yield take(type.DELETE_POST);
        const deleteUrl = `https://simple-blog-api.crew.red/posts/${payload}`;
        const response = yield axios.delete(deleteUrl).then(res => res)
            .catch(error => error);

        if (response.status === 200) {
            yield all([
                yield put(action_type.responseMessage('Post successful deleted!')),
                yield put(action_type.onSuccess())
            ])
        } else {
            const message = 'Something goes wrong try again later!';
            yield all([
                put(action_type.responseMessage(message)),
                put(action_type.onFail())
            ])
        }
    }
}

export function* rootSaga() {
    yield all([getPostsDataSaga(), getPostSaga(), addPostSaga(), deletePostSaga()]);
}

