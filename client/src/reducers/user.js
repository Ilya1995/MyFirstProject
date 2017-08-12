import {
    READ_CLIENT_SUCCESS
} from '../constants/User';

const initialState = {
    isAuth: false,
    name: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case READ_CLIENT_SUCCESS:
            return { ...state, name: action.name, isAuth: true };

        default:
            return state
    }
}