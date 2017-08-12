// import {
//     REG_CLIENT_FAILURE
// } from '../constants/Registration';
//
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

export const registration = (data) => {
    console.log(data);
    return () => {//dispatch
        console.log(data);
        fetch('/api/registration', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.result) {
                //dispatch(readClientSuccess(json.data.data));
                NotificationManager.info('Регистрация прошла успешно', 'Регистрация', 5000);
                console.log(json.note);
            } else {
                NotificationManager.error('Ошибка регистрации', 'Регистрация', 5000);
                console.log(json.note);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};



// export const sendEmail = (data) => {
//     return () => {
//         fetch('/api/sendEmail', {
//             method: 'post',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(json => {
//             console.log(json);
//             if (json.result) {
//                 console.log('Сообщение доставлено');
//             } else {
//                 console.log('Сообщение не доставлено');
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             console.log('Сообщение не доставлено');
//         })
//     }
// };
//
// const regClientFailture = (note) => {
//     return {
//         type: REG_CLIENT_FAILURE,
//         note: note
//     }
// };
