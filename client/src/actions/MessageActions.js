import {

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
    return () => {
        console.debug('Получить сообщения');
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