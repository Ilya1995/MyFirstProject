import {
    READ_CLIENT_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/User';

const initialState = {
    isAuth: false,
    name: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case READ_CLIENT_SUCCESS:
            return { ...state, name: action.name, balance: action.balance, email: action.email, isAuth: true };

        case LOGOUT_SUCCESS:
            return { ...state, name: '', isAuth: false};

        default:
            return state
    }
}