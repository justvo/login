import { SET_FIRSTNAME,SET_LASTNAME,SET_USEREMAIL,SET_PASSWORD,SET_CONFIRMPASSWORD } from '../TypeAction/TypeAction';

const initialState = {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    password: '',
    confirmPassword: '',
}; 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIRSTNAME:
            return { ...state, userFirstName: action.payload };
        case SET_LASTNAME:
            return { ...state, userLastName: action.payload };
        case SET_USEREMAIL:
            return { ...state, userEmail: action.payload };
        case SET_PASSWORD:
            return { ...state, password: action.payload };
        case SET_CONFIRMPASSWORD:
            return { ...state, confirmPassword: action.payload };
        default:
            return state;
    }

}
export default reducer