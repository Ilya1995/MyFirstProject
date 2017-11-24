import {
    GET_MESSAGES_SUCCESS
} from '../constants/Message';
import {
    REFRESH_MONEY_SUCCESS
} from '../constants/User';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

/**
 * Доставка сообщения
 */
export const sendMessage = (data, callback) => {
    return (dispatch) => {
        console.debug('Попытка отправить сообщение');
        fetch('/api/sendMessage', {
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
                console.log('Сообщение отправлено');
                NotificationManager.info(json.data.note, 'Доставка сообщения', 5000);
                dispatch(refreshMoney(json.data.balance));
                return callback(null);
            } else {
                console.log(json.note);
                console.log('Не удалось отправить сообщение');
                if (typeof(json.note) === 'string') {
                    NotificationManager.error(json.note, 'Доставка сообщения', 5000);
                    return callback(json.note);
                }
                NotificationManager.error('Ошибка', 'Доставка сообщения', 5000);
                return callback(null);
            }
        })
        .catch(err => {
            console.log(err + '. Не удалось отправить сообщение');
            NotificationManager.error('Сообщение не отправлено', 'Доставка сообщения', 5000);
            return callback(null);
        })
    };
};

/**
 * Получить сообщения для отчёта
 */
export const getMessages = (params) => {
    return (dispatch) => {
        console.debug('Получить сообщения');
        fetch('/api/getMessages/' + params.userId , {
            method: 'get'
        })
        .then(response => response.json())
        .then(json => {
            if (json.result) {
                console.debug(json.data);
                dispatch(getMessagesSuccess(json.data));
            } else {
                NotificationManager.error('Не удалось получить отчёты по сообщениям', 'Отчёты', 5000);
            }
        })
        .catch(err => {
            console.error(err + '. Не удалось получить отчёты по сообщениям');
        })
    };
};

const refreshMoney = (data) => {
    return {
        type: REFRESH_MONEY_SUCCESS,
        data: {
            balance: data
        }
    }
};

const getMessagesSuccess = (data) => {
    return {
        type: GET_MESSAGES_SUCCESS,
        messages: data
    }
};