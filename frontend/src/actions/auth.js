import { AUTH } from './types';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router.push('/');

    } catch (error) {
        console.log(error);
        alert("Invalid Credentials...");
    }
};
/*
export function bindComments(postId) {
    return function(dispatch) {
        return API.fetchComments(postId).then(comments => {
            // dispatch
            dispatch({
                type: BIND_COMMENTS,
                comments,
                postId
            });
        });
    };
}*/


export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        console.log(error);
        alert("Invalid Credentials...");
    }
};
