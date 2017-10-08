import {
    GET_MESSAGES_SUCCESS
} from '../constants/Message';
import 'whatwg-fetch'
//import { NotificationManager } from 'react-notifications';

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
            } else {
                console.log('Не удалось отправить сообщение');
            }
        })
        .catch(err => {
            console.log(err + '. Не удалось отправить сообщение');
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