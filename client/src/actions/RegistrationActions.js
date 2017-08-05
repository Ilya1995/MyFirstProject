// import {
//     REG_CLIENT_FAILURE
// } from '../constants/Registration';
//
// import 'whatwg-fetch'
//
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
