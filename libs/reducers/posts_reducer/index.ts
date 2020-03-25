import * as actionType from './types';

export const example = {};
// state for start
const initialState: actionType.PostsState = {
    posts: [],
    singlePost: {},
    onFailStatus: false,
    onSuccessStatus: false,
    responseMessage: undefined,
};

export const postsReducer = (state = initialState, action): actionType.PostsState => {
    const { type, payload } = action;
    switch (type) {
        case actionType.ON_FAIL:
            return {
                ...state,
                onFailStatus: !state.onFailStatus,
            };
        case actionType.ON_SUCCESS:
            return {
                ...state,
                onSuccessStatus: !state.onSuccessStatus,
            };
        case actionType.responseMessage:
            return {
                ...state,
                responseMessage: payload,
            };
        case actionType.SET_POSTS_DATA:
            return {
                ...state,
                posts: payload,
            };
        case actionType.ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
            };
        case actionType.GET_SINGLE_POST:
            return {
                ...state,
                singlePost: payload,
            };
        default:
            return state;
    }
};
