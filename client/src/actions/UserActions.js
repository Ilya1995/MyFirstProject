import {
    LOGOUT_SUCCESS,
    READ_CLIENT_SUCCESS
} from '../constants/User';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

export const authentication = (data) => {
    console.log(data);
    return (dispatch) => {
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
                dispatch(readClientSuccess(json.data));
                NotificationManager.info('Авторизация прошла успешно', 'Авторизация', 5000);
                console.log(json.data);
            } else {
                NotificationManager.error('Неверный логин или пароль', 'Авторизация', 5000);
                console.log(json.note);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};


/**
 * Выход из профиля
 */
export const logout = () => {
    return (dispatch) => {
        fetch('/api/logout', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
             if (json.result) {
                 console.log('Пользователь разлогинился');
                 dispatch(logoutSuccess());
             } else {
                 console.log('Разлогиниться не получилось');
             }
        })
        .catch(err => {
            console.log(err + '. Разлогиниться не получилось');
        })
    };
};

/**
 * Авторизация после перезагрузки страницы
 */
export const getLoggedUser = () => {
    return (dispatch) => {
        fetch('/api/getLoggedUser', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.result) {
                dispatch(readClientSuccess(json.data));
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};

const readClientSuccess = (data) => {
    return {
        type: READ_CLIENT_SUCCESS,
        name: data
    }
};

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};
