//action.js
import { SET_FIRSTNAME, SET_LASTNAME, SET_USEREMAIL, SET_PASSWORD, SET_CONFIRMPASSWORD, SET_USERS } from '../actionType/actionType';

export const setFirstName = (userFirstName) => ({
    type: SET_FIRSTNAME,
    payload:userFirstName
})
export const setLastName = (userLastName) => ({
    type: SET_LASTNAME,
    payload:userLastName
})
export const setEmail = (userEmail) => ({
    type: SET_USEREMAIL,
    payload:userEmail
})
export const setPassword = (password) => ({
    type: SET_PASSWORD,
    payload: password
})
export const setConfirmPassword = (confirmPassword) => ({
    type: SET_CONFIRMPASSWORD,
    payload:confirmPassword
})
export const setUsers = (users) => ({
    type: SET_USERS,
    payload:users 
})