import * as action_type from './types';

export const addNewPost = (newPost: action_type.Post): action_type.PostsActionTypes => {
    return {
        type: action_type.ADD_NEW_POST,
        payload: newPost
    }
};

export const deletePost = (id) => {
    return {
        type: action_type.DELETE_POST,
        payload: id
    }
};

export const getPostsData = (posts: action_type.PostsState): action_type.PostsActionTypes => {
    return {
        type: action_type.SET_POSTS_DATA,
        payload: posts
    }
};

export const onSuccess = () => ({
    type: action_type.ON_SUCCESS,
});

export const onFail = () => ({
    type: action_type.ON_FAIL,
});

export const responseMessage = (message) => ({
    type: action_type.RESPONSE_MESSAGE,
    payload: message
});

export const getSinglePost = (post: any): action_type.PostsActionTypes => {
    return {
        type: action_type.GET_SINGLE_POST,
        payload: post
    }
};

