import {
    REG_CLIENT_REQUEST,
    REG_CLIENT_SUCCESS,
    REG_CLIENT_FAILURE,
    CHECK_TYPE_OF_OWNERSHIP,
    REG_OVER,
    ENTER_ADDRESS
} from '../constants/Registration';

const initialState = {
    data: {},
    typeOfOwnership: null,
    result: false,
    note: '',
    address: {}
};

export default function registration(state = initialState, action) {
    console.log('red', action);
    switch (action.type) {
        case REG_CLIENT_REQUEST:
            return { ...state, data: action.payload };

        case REG_CLIENT_SUCCESS:
            return { login: action.login, password: action.password, email: action.email };

        case REG_OVER:
            return { info: action.payload };

        case CHECK_TYPE_OF_OWNERSHIP:
            return { ...state, typeOfOwnership: action.typeOfOwnership };

        case ENTER_ADDRESS:
            return { ...state, address: action.address };

        case REG_CLIENT_FAILURE:
            return { note: action.note };

        default:
            return state;
    }
}
