import {
    GET_MESSAGES_SUCCESS
} from '../constants/Message';

const initialState = {

};

export default function messages(state = initialState, action) {
    switch (action.type) {

        case GET_MESSAGES_SUCCESS:
            return { ...state, messages: action.messages};

        default:
            return state
    }
}