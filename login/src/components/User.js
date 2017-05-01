'use strict';
import React, {  Component } from 'react'

export default class User extends Component {

    authentication(){
        // fetch('/publish', {
        //     method: 'post',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({qwe: '23132'})//formData//JSON.stringify({data: '1234567'})
        // })
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (data) {
        //     console.log(data);
        //     // if(data.result){
        //     // alert(data.data);
        //     // }
        // })
        // .catch(function (err) {
        //     console.log('1111111111111'+ err);
        // });

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/publish', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            login: document.getElementById('login').value,
            password: document.getElementById('pass').value,
            event: 'entry'}));

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                //console.log(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
            }
        };

        {/*fetch('/publish', {
            method: 'post',
            headers: {
                   'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: document.getElementById('login').value,
                password: document.getElementById('pass').value,
                event: 'entry'})
        })
        .then(function (response) {
            console.log(response);
               return response.json();
        })
        .then(function (data) {
             console.log(data);
             console.log('11111111');
             if(data.result){
                 alert(data.answer);
                 window.open('welcome.html', '_self');
                 document.getElementById('login').value = '';
                 document.getElementById('pass').value = '';
             }else{
                 alert(data.answer);
             }
        })
        .catch(function (err) {
            console.log('1111111111111111'+err);
        })*/}
    }

    render() {
        const { name } = this.props;
        return <div>
            <form className='form1'>
                <div>
                    Логин
                </div>
                <input id='login' className='inp' type='text' name='message' />
                <div>
                    Пароль
                </div>
                <input id='pass' className='inp' type='password' name='password' />
                <input className='button' onClick={this.authentication} id='but' type='submit' name='Вход' value='Вход' />

                <div className='forgot'>Забыли пароль?</div>
                <input className='button' id='reg' type='button' name='Регистрация' value='Регистрация' />
            </form>
            <p>Привет, {name}!</p>
        </div>
    }
}

// User.propTypes = {
//     name: PropTypes.string.isRequired
// };