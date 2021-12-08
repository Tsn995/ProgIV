import { createSlice } from '@reduxjs/toolkit'

const loadInitialState = () => {
    let savedState = sessionStorage.getItem('tech-manager-auth')
    if (savedState != null) {
        return JSON.parse(savedState)
    }

    return { 
        isAuth: false, 
        userData: {
            token: null,
            userName: null,
            userId: null,
            isAdmin: false
        }
    }
}

const initialState = loadInitialState()

const loginAction = (state, loginResult) => {
    state.isAuth = true
    state.userData = {
        token: loginResult.token,
        userName: loginResult.userData.name,
        userId: loginResult.userData.id,
        isAdmin: loginResult.userData.roles.indexOf('ROLE_ADMIN') !== -1
    }

    sessionStorage.setItem('tech-manager-auth', JSON.stringify(state))
}

const logoutAction = (state) => {
    state.isAuth = false
    state.userData = {
        token: null,
        userName: null,
        userId: null,
        isAdmin: false,
    }

    sessionStorage.removeItem('tech-manager-auth')
}

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        login: (state, action) => loginAction(state, action.payload),
        logout: (state) => logoutAction(state)
    }
})

export const { login, logout } = authSlice.actions

const authReducer = authSlice.reducer

export {
    initialState,
    authReducer
}

export default authSlice.reducer