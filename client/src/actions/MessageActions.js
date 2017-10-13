import {
    GET_MESSAGES_SUCCESS
} from '../constants/Message';
import 'whatwg-fetch'
import { NotificationManager } from 'react-notifications';

/**
 * Доставка сообщения
 */
export const sendMessage = (data) => {
    return () => {
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
                NotificationManager.info(json.note, 'Доставка сообщения', 5000);
            } else {
                console.log('Не удалось отправить сообщение');
                NotificationManager.error(json.note, 'Доставка сообщения', 5000);
            }
        })
        .catch(err => {
            console.log(err + '. Не удалось отправить сообщение');
            NotificationManager.error('Сообщение не отправлено', 'Доставка сообщения', 5000);
        })
    };
};

/**
 * Получить сообщения для отчёта
 */
export const getMessages = () => {
    return (dispatch) => {
        console.debug('Получить сообщения');
        fetch('/api/getMessages', {
            method: 'get'
        })
        .then(response => response.json())
        .then(json => {
            if (json.result) {
                console.debug(json.data);
                dispatch(getMessagesSuccess(json.data));
            } else {
                console.error('Не удалось получить отчёты по сообщениям');
            }
        })
        .catch(err => {
            console.error(err + '. Не удалось получить отчёты по сообщениям');
        })
    };
};

const getMessagesSuccess = (data) => {
    return {
        type: GET_MESSAGES_SUCCESS,
        messages: data
    }
};