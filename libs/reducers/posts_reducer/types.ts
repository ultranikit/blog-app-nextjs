export const GET_POSTS_DATA = "GET_POSTS_DATA";
export const GET_SINGLE_POST = "GET_SINGLE_POST";
export const SET_POSTS_DATA = "SET_POSTS_DATA";

export const ADD_NEW_POST = "ADD_NEW_POST";
export const DELETE_POST = "DELETE_POST";

export const ON_FAIL = "ON_FAIL";
export const ON_SUCCESS = "ON_SUCCESS";
export const RESPONSE_MESSAGE = "RESPONSE_MESSAGE";

export interface Post {
    id?: number,
    title: string,
    body: string
}

export interface PostsState {
    posts: Post[],
    single_post: {}
    onFailStatus: boolean,
    onSuccessStatus: boolean,
    response_message: string,
}

interface AddNewPostAction {
    type: typeof ADD_NEW_POST,
    payload: Post,
}

interface GetPostsAction {
    type: typeof SET_POSTS_DATA,
    payload: PostsState
}

interface GetSinglePostAction {
    type: typeof GET_SINGLE_POST,
    payload: any
}

export type PostsActionTypes = AddNewPostAction | GetPostsAction | GetSinglePostAction;