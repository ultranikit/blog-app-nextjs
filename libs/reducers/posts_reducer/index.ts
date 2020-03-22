import * as action_type from './types';

export const example = {

};
// state for start
const initialState: action_type.PostsState = {
    posts: [],
    single_post: {},
    onFailStatus: false,
    onSuccessStatus: false,
    response_message: undefined,
};

export const postsReducer = (state = initialState, action): action_type.PostsState => {
    const {type, payload} = action;
    switch (type) {
        case action_type.ON_FAIL:
            return {
                ...state,
                onFailStatus: !state.onFailStatus
            };
        case action_type.ON_SUCCESS:
            return {
                ...state,
                onSuccessStatus: !state.onSuccessStatus
            };
        case action_type.RESPONSE_MESSAGE:
            return {
                ...state,
                response_message: payload
            };
        case action_type.SET_POSTS_DATA:
            return {
                ...state,
                posts: payload
            };
        case action_type.ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, payload]
            };
        case action_type.GET_SINGLE_POST:
            return {
                ...state,
                single_post: payload
            };
        default:
            return state
    }
};