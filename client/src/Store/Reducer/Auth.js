import * as actionTypes from '../Action/Types'
import { updateObject } from '../../shared/Utility'

const initialState = {
    email: null,
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, { error: null })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        email: action.email,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: true
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const logout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        loading: false
    })
}

const setAuthRedirectPath = (state, action) => { 
    return {

    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        default:
            return state
    }
}

export default reducer;