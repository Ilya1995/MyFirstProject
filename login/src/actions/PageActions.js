import {
    SET_YEAR,
    LOADING
} from '../constants/Page'

export function setYear(year, photos) {

    return (dispatch) => {
        dispatch({
            type: LOADING,
            payload: year
        });

        setTimeout(()=> {
            dispatch({
                type: SET_YEAR,
                photos: photos
            })
        }, 1000);
    }
}