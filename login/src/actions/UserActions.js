import {
    SET_YEAR,
    LOADING
} from '../constants/Page'

export function authentication() {
    fetch('/publish', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: document.getElementById('login').value,
            password: document.getElementById('pass').value,
            event: 'entry'})
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log('11111111');
            if(data.result){
                alert(data.answer);
                window.open('welcome.html', '_self');
                document.getElementById('login').value = '';
                document.getElementById('pass').value = '';
            }else{
                alert(data.answer);
            }
        })
        .catch(function (err) {
            console.log('1111111111111111'+err);
        })
}

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