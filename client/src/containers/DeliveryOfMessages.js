import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-notifications/lib/notifications.css';
import * as userActions from '../actions/UserActions';
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask.js';

class DeliveryOfMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSendEmail: true
        }
    }

    render() {

        return (
            <div className='form-group'>
                <form id='sendMes-form'>
                    <h3>Доставка сообщений</h3>
                    <div>
                        <p><input defaultChecked type='radio' name='choiceType' onClick={() => this.setState({isSendEmail: true})}/> EMAIL</p>
                        <p><input type='radio' name='choiceType' onClick={() => this.setState({isSendEmail: false})}/> SMS</p>
                    </div>
                    <hr className='hr'/>
                    {this.state.isSendEmail ?
                        <div>
                            <h5>Темa</h5>
                            <input id='subjectMess' className='shadow' />
                        </div>              : ''}
                    <div>
                        <h5 className={this.state.isSendEmail ? 'textMess': ''}>Текст</h5>
                        <textarea id='textMess' className='text' placeholder='Текст сообщения'/>
                    </div>
                    <div>
                        {this.state.isSendEmail ?
                            <div>
                                <h5>Введите email получателя</h5>
                                <MaskedInput mask={emailMask}
                                             id='emailMess'
                                             className='shadow'
                                             name='email'
                                             ref='email' />
                            </div>
                            :
                            <div>
                                <br/>
                                <h5>Введите номер телефона</h5>
                                <p> </p>
                                <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                             id='phoneMess'
                                             className='shadow'
                                             name='phone'
                                             ref='phone' />
                            </div>
                        }
                    </div>
                </form>
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
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryOfMessages)