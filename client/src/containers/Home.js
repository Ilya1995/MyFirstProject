import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import * as userActions from '../actions/UserActions'
import * as registrationActions from '../actions/RegistrationActions'
import 'react-notifications/lib/notifications.css';
//import FormAut from '../containers/FormAut'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalLogin: false
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

        return (
            <div>
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
                                <a href='#'>Забыли пароль?</a>
                            </p>
                        </footer>
                        <input value='Войти' type='submit' onClick={authentication}/>
                        <input className='btn-reg' value='Регистрация' type='submit'/>

                    </fieldset>
                </form>
                <NotificationContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user,
        regInfo: state.registration
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        registrationActions: bindActionCreators(registrationActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
