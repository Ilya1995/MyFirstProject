import {
    READ_CLIENT_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_MONEY_SUCCESS,
    GET_CLIENT
} from '../constants/User';

const initialState = {
    isAuth: false,
    name: '',
    preloader: false
};

export default function user(state = initialState, action) {
    switch (action.type) {


        case GET_CLIENT:
            return { ...state, preloader: action.data.preloader};

        case READ_CLIENT_SUCCESS:
            return { ...state, userId: action.data.userId, name: action.data.name, balance: action.data.balance,
                email: action.data.email, token: action.data.token, isAuth: true, preloader: action.data.preloader};

        case LOGOUT_SUCCESS:
            return { ...state, name: '', isAuth: false};

        case REFRESH_MONEY_SUCCESS:
            return { ...state, balance: action.data.balance};

        default:
            return state
    }
}