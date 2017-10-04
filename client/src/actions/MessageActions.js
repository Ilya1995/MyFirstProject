import {
    GET_MESSAGES_SUCCESS
} from '../constants/Message';
import 'whatwg-fetch'
//import { NotificationManager } from 'react-notifications';

/**
 * Доставка сообщения
 */
export const sendMess = () => {
    return () => {
        console.debug('Сообщение доставлено');
        // fetch('/api/logout', {
        //     method: 'post',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // })
        // .then(response => response.json())
        // .then(json => {
        //     if (json.result) {
        //         console.log('Пользователь разлогинился');
        //     } else {
        //         console.log('Разлогиниться не получилось');
        //     }
        // })
        // .catch(err => {
        //     console.log(err + '. Разлогиниться не получилось');
        // })
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