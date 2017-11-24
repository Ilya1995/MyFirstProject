import {
    LOGOUT_SUCCESS,
    READ_CLIENT_SUCCESS,
    REFRESH_MONEY_SUCCESS
} from '../constants/User';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

/**
 * Пополнение баланса
 */
export const replenishBalance = (data) => {
    console.log(data);
    return (dispatch) => {
        fetch('/api/replenish', {
            method: 'put',
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
                dispatch(replenishBalanceSuccess(json.data));
                NotificationManager.info('Баланс успешно пополнен', 'Пополнение баланса', 5000);
            } else {
                NotificationManager.error(json.note, 'Пополнение баланса', 5000);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
};

/**
 * Аутентификация
 */
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
                NotificationManager.error(json.note, 'Авторизация', 5000);
                console.log(json.note);
            }
        })
        .catch(err => {
            NotificationManager.error('Ошибка авторицаии', 'Авторизация', 5000);
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

const replenishBalanceSuccess = (data) => {
    return {
        type: REFRESH_MONEY_SUCCESS,
        data: {
            balance: data
        }
    }
};

const readClientSuccess = (data) => {
    return {
        type: READ_CLIENT_SUCCESS,
        data: {
            userId: data.userId,
            name: data.name,
            balance: data.balance,
            email: data.email,
            token: data.token
        }
    }
};

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};
