import * as actionTypes from './Types'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (email, token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (authData) => async dispatch => {
    dispatch(authStart());
    try {
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBv-cZ6N5iL2PYdZvMhFOvCB2XPDUuTQ2Q';
        let authResponce = await axios.post(url, authData);
        if (authResponce.status === 200) {
            console.log(authResponce.data);
            localStorage.setItem('email', authResponce.data.email);
            localStorage.setItem('token', authResponce.data.idToken);
            localStorage.setItem('userId', authResponce.data.localId);
            dispatch(authSuccess(authResponce.data.email, authResponce.data.idToken, authResponce.data.localId));
        }
    } catch (err) {
        dispatch(authFail(err))
    }
}

export const setAuthRedirectPath = (path) => {
    console.log(path)
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const email = localStorage.getItem('email');
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(email, token, userId));
    }
}