import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications';
import { bindActionCreators } from 'redux'
import NavLink from '../components/NavLink'
import * as userActions from '../actions/UserActions'
import * as messageActions from '../actions/MessageActions'
import ModalNewMess from '../components/ModalNewMess'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalNewMess: false,
            sendOrReport: ''
        }
    }
    
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        const { getLoggedUser } = this.props.userActions;
        getLoggedUser();
    }

    render() {
        const { isAuth, name } = this.props.userInfo;

        const onLogout = () => {
            const { logout } = this.props.userActions;
            logout();
        };

        const okModal = (data) => {
            console.log(data);
            if (!data.textMess) {
                return NotificationManager.info('Не заполнено поле с текстом', 'Доставка сообщения', 5000);
            }
            if ((!data.emailMess || !data.subjectMess) && !data.phoneMess) {
                return NotificationManager.info('Заполните все поля', 'Доставка сообщения', 5000);
            }
            const { sendMess } = this.props.messageActions;
            sendMess(data);
            closeModal();
        };

        const closeModal = () => {
            this.setState({isOpenModalNewMess: false});
        };
        
        return (
            <div>
                <div className='header'>
                    <section id='container'>
                        <nav>
                            <ul className='nav'>
                                <li><NavLink className='nav-icon NavLink' title='Главная'><span className='icon-home'>Главная</span></NavLink></li>
                                <li><NavLink className='NavLink'>Сообщения</NavLink>
                                    <div>
                                        <ul>
                                            <li><NavLink className='NavLink'
                                                         onClick={() => {
                                                             this.setState({isOpenModalNewMess: true});
                                                             this.setState({sendOrReport: 'send'});
                                                         }}>
                                                Новое
                                            </NavLink></li>
                                            <li><NavLink className='NavLink'
                                                         onClick={() => {
                                                             this.setState({isOpenModalNewMess: true});
                                                             this.setState({sendOrReport: 'report'});
                                                         }}
                                            >Отправленные</NavLink></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><NavLink className='NavLink'>Поддержка</NavLink></li>
                                <li><NavLink className='NavLink'>Обучение</NavLink></li>
                                <li><NavLink className='NavLink'>О нас</NavLink></li>
                                <li><NavLink className='NavLink'>Блог</NavLink></li>
                                <li><NavLink className='NavLink'>Контакты</NavLink></li>
                            </ul>
                            {isAuth ?
                                <ul className='nav nav-right'>
                                    <li><NavLink className='NavLink'>Привет, {name}</NavLink></li>
                                    <li onClick={onLogout}><NavLink className='NavLink'>Выход</NavLink></li>
                                </ul> : ''}
                        </nav>
                    </section>
                </div>
                <ModalNewMess isOpenModal={this.state.isOpenModalNewMess}
                              sendOrReport={this.state.sendOrReport}
                              okModal={okModal}
                              closeModal={closeModal}/>
                {this.props.children}
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
        messageActions: bindActionCreators(messageActions, dispatch)
    }
};

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
