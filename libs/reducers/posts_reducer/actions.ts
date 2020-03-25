import * as actionType from './types';

export const addNewPost = (newPost: actionType.Post): actionType.PostsActionTypes => {
    return {
        type: actionType.ADD_NEW_POST,
        payload: newPost,
    };
};

export const deletePost = (id) => {
    return {
        type: actionType.DELETE_POST,
        payload: id,
    };
};

export const getPostsData = (posts: actionType.PostsState): actionType.PostsActionTypes => {
    return {
        type: actionType.SET_POSTS_DATA,
        payload: posts,
    };
};

export const onSuccess = () => ({
    type: actionType.ON_SUCCESS,
});

export const onFail = () => ({
    type: actionType.ON_FAIL,
});

export const onResponseMessage = (message) => ({
    type: actionType.responseMessage,
    payload: message,
});

export const getSinglePost = (post: any): actionType.PostsActionTypes => {
    return {
        type: actionType.GET_SINGLE_POST,
        payload: post,
    };
};
