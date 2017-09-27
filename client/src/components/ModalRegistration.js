import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import Captcha from '../components/Captcha'
import MaskedInput from 'react-text-mask'
import emailMask from 'text-mask-addons/dist/emailMask.js'

const ModalRegistration = ({isOpenModal, okModal, closeModal}) => {
    const customStyle = {
        overlay : {
            position          : 'fixed',
            top               : 0,
            left              : 0,
            right             : 0,
            bottom            : 0,
            backgroundColor   : 'rgba(255, 255, 255, 0.75)'
        },
        content : {
            position                   : 'absolute',
            top                        : '0',
            left                       : '0',
            right                      : '0',
            bottom                     : '0',
            width                      : '500px',
            height                     : '530px',
            border                     : '1px solid #ccc',
            background                 : '#fff',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '4px',
            outline                    : 'none',
            padding                    : '20px',
            margin                     : 'auto'
        }
    };

    let captcha = false;

    return (
        <Modal
            isOpen={isOpenModal}
            style={customStyle}
            contentLabel='Логин пароль'>

            <div>
                <div className='alpha-inner'>
                    <h1 className='text-center page-header'>Регистрация</h1>
                </div>
                <div className='form-group'>

                    <label className='text-label' htmlFor='regLogin'>Логин</label>
                    <input id='regLogin'
                           type='text'
                           defaultValue=''
                           className='form-control'
                           name='regLogin'/>

                    <label className='text-label' htmlFor='pass1'>Пароль</label>
                    <input id='pass1'
                           type='password'
                           defaultValue=''
                           className='form-control'
                           name='pass1'/>

                    <label className='text-label' htmlFor='pass2'>Повторите пароль</label>
                    <input id='pass2'
                           type='password'
                           defaultValue=''
                           className='form-control'
                           name='pass2'/>

                    <label className='text-label' htmlFor='name'>Ваше имя</label>
                    <input id='name'
                           type='text'
                           defaultValue=''
                           className='form-control'
                           name='name'/>

                    <label className='text-label' htmlFor='email'>E-mail</label>
                    <MaskedInput id='email'
                                 mask={emailMask}
                                 className='form-control'
                                 name='email'/>

                    <Captcha setVerifyRecaptcha ={(res) => captcha=res}/>
                </div>
                <div className='footer reg-form'>
                    <a className='btn-l btn-blue btn-indent btn-medium' onClick={closeModal}>
                        Отмена
                    </a>
                    <a className='btn-r btn-blue btn-indent btn-medium' onClick={()=>okModal({
                        login: document.getElementById('regLogin').value,
                        pass1: document.getElementById('pass1').value,
                        pass2: document.getElementById('pass2').value,
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        captcha: captcha})}>
                        Подтвердить
                    </a>
                </div>
                <br/><br/><br/><br/>
            </div>

        </Modal>
    )
};

ModalRegistration.propTypes = {
    isOpenModal: PropTypes.bool.isRequired,
    okModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ModalRegistration;