// import {
//     READ_CLIENT_SUCCESS
// } from '../constants/User';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

export const authentication = (data) => {
    console.log(data);
    return () => {//dispatch
        console.log(data);
        fetch('/api/authentication', {
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
                NotificationManager.info('Авторизация прошла успешно', 'Авторизация', 5000);
                console.log(json.data);
            }else {
                NotificationManager.error('Неверный логин или пароль', 'Авторизация', 5000);
                console.log(json.note);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};

// export const readClient = (data) => {
//     return (dispatch) => {
//         console.log(data);
//         fetch('/api/readClient', {
//             method: 'post',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(json => {
//             if (json.result) {
//                 dispatch(readClientSuccess(json.data.data));
//                 console.log(json.data);
//             }else {
//                 console.log(json.note);
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// };
//
// export const login = (data, router) => {
//     return (dispatch) => {
//         dispatch(loginRequest(data));
//         fetch('/api/authorization', {
//             method: 'post',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(json => {
//             if (json.result) {
//                 console.log(json.data);
//                 dispatch(loginSuccess(json.data));
//                 router.push('/account');
//                 NotificationManager.success('Авторизация прошла успешно', 'Регистрация', 5000);
//             } else {
//                 dispatch(loginFail(json.note));
//                 router.push('/');
//                 NotificationManager.error('Не удалось авторизоваться', 'Регистрация', 5000);
//             }
//         })
//         .catch(err => {
//             dispatch(loginFail(err));
//             NotificationManager.error('Не удалось авторизоваться', 'Регистрация', 5000);
//         })
//     }
// };
//
// const readClientSuccess = (data) => {
//     return {
//         type: READ_CLIENT_SUCCESS,
//         client: data
//     }
// };
