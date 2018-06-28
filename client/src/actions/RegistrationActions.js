// import {
//     REG_CLIENT_FAILURE
// } from '../constants/Registration';
//
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

export const registration = (data, callback) => {
    console.log(data);
    return () => {//dispatch
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
                return callback(null, json.result);
            } else {
                NotificationManager.error(json.note, 'Регистрация', 5000);
                return callback(json.result);
            }
        })
        .catch(err => {
            NotificationManager.error('Ошибка регистрации', 'Регистрация', 5000);
            console.log(err);
            return callback(false);
        })
    }
};

export const sendEmail = (data) => {
    console.log(data);
    return () => {
        fetch('/api/sendEmail', {
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
                console.log(json.note);
                NotificationManager.info('На ваш почтовый ящик отправленно письмо', 'Регистрация', 5000);
            } else {
                console.log(json.note);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};


// const regClientFailture = (note) => {
//     return {
//         type: REG_CLIENT_FAILURE,
//         note: note
//     }
// };
