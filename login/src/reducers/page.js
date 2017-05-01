import {
    SET_YEAR,
    LOADING
} from '../constants/Page'

const initialState = {
    year: 2016,
    photos: [],
    fetching: false
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case SET_YEAR:
            return { ...state, photos: action.photos, fetching: false };

        case LOADING:
            return { ...state, year: action.payload, fetching: true };

        default:
            return state;
    }
}