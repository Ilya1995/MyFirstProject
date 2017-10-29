import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as userActions from '../actions/UserActions'
import * as registrationActions from '../actions/RegistrationActions'
import ModalRegistration from '../components/ModalRegistration'

class FormAut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalRegistration: false
        }
    }

    static contextTypes = {
        router: PropTypes.object
    };

    render() {

        const authentication = () => {
            const { authentication } = this.props.userActions;
            if (!this.refs.login.value) {
                return NotificationManager.info('Не заполнено поле login', 'Авторизация', 5000);
            }
            if (!this.refs.password.value) {
                return NotificationManager.info('Не заполнено поле password', 'Авторизация', 5000);
            }
            authentication({login: this.refs.login.value, password: this.refs.password.value});
        };

        const registration = () => {
            this.setState({isOpenModalRegistration: true});
        };

        const okModal = (data) => {
            if (!data.login) {
                return NotificationManager.info('Не заполнено поле login', 'Регистрация', 5000);
            }
            if (data.pass1 !== data.pass2) {
                return NotificationManager.info('Пароли не совпадают', 'Регистрация', 5000);
            }
            if (!data.name) {
                return NotificationManager.info('Заполните имя с именем', 'Регистрация', 5000);
            }
            if (!data.captcha) {
                return NotificationManager.info('Заполните капчу', 'Регистрация', 5000);
            }
            const { registration, sendEmail } = this.props.registrationActions;
            registration(data, function (err, note) {
                if (data.email && note) {
                    sendEmail({email: data.email, login: data.login, password: data.pass1});
                }
            });
            console.log(data);
            closeModal();
        };

        const closeModal = () => {
            this.setState({isOpenModalRegistration: false});
        };

        return (
            <div className='form-group'>
                <form id='login-form'>
                    <h1>Авторизация на сайте</h1>
                    <fieldset>
                        <span className='span fontawesome-user'> </span>
                        <input type='text' ref='login' placeholder='login'/>
                        <span className='span fontawesome-lock'> </span>
                        <input className='inp-pass' type='password' ref='password' placeholder='password'/>

                        <footer className='clearfix'>
                            <p>
                                <span className='info'>?</span>
                                <a onClick={() => NotificationManager.info('Напряги мозги', 'Авторизация', 5000)}>Забыли пароль?</a>
                            </p>
                        </footer>
                        <a className='btn-reg btn-blue btn-l btn-indent' value='Регистрация' type='submit' onClick={registration}>Регистрация</a>
                        <a className='btn-blue btn-r btn-indent' value='Войти' type='submit' onClick={authentication}>Войти</a>

                    </fieldset>
                </form>
                <ModalRegistration isOpenModal={this.state.isOpenModalRegistration}
                                   okModal={okModal}
                                   closeModal={closeModal}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        registrationActions: bindActionCreators(registrationActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAut)