import { SET_FIRSTNAME, SET_LASTNAME, SET_USEREMAIL, SET_PASSWORD, SET_CONFIRMPASSWORD, SET_USERS } from '../actionType/actionType';

const initialState = {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    password: '',
    confirmPassword: '',
    users: [{
        userFirstName: 'vlad',
        userLastName: 'oty',
        userEmail: 'user@gmail.com',
        password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
    }]
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
        case SET_USERS:
            return { ...state, users: [...state.users, action.payload] };
        default:
            return state;
    }

}
export default reducer