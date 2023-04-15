import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: false,
}
export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart:(state) =>{
            state.loading = true
        },
        loginSuccess: (state, action) =>{
            state.loading = false
            state.user = action.payload
            
        },
        loginFailed: (state) =>{
            state.loading = false
            state.error = true
        },
        logOut: (state) =>{
            state.user = null;
            state.loading = false;
            state.error = false;
            
        },
        signupStart: (state) =>{
            state.loading = true
        },
        signupSuccess: (state , action) =>{
            state.loading = false
            state.user = action.payload
        },
        signupFailed:(state) =>{
            state.loading = false
            state.error = true
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        subscription:(state, action) =>{
            if(state.user.subscribedUser.includes(action.payload)){
                state.user.subscribedUser.splice(
                    state.user.subscribedUser.findIndex(
                        (channelId) => channelId === action.payload
                    ),1
                )
            }else{
                state.user.subscribedUser.push(action.payload)
            }
        }
    },
})

export const {loginStart, loginSuccess , loginFailed, logOut , signupStart , signupSuccess, signupFailed , setUser , subscription} = authSlice.actions

export default authSlice.reducer

