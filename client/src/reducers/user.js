import {
    READ_CLIENT_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_MONEY_SUCCESS
} from '../constants/User';

const initialState = {
    isAuth: false,
    name: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case READ_CLIENT_SUCCESS:
            return { ...state, userId: action.data.userId, name: action.data.name, balance: action.data.balance,
                email: action.data.email, isAuth: true };

        case LOGOUT_SUCCESS:
            return { ...state, name: '', isAuth: false};

        case REFRESH_MONEY_SUCCESS:
            return { ...state, balance: action.data.balance};

        default:
            return state
    }
}