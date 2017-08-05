import React, { PropTypes } from 'react'
import Modal from 'react-modal'

const ModalLogin = ({info, isOpenModal, closeModal}) => {
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
            width                      : '300px',
            height                     : '230px',
            border                     : '1px solid #ccc',
            background                 : '#fff',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '4px',
            outline                    : 'none',
            padding                    : '20px',
            margin: 'auto'
        }
    };

    return (
        <Modal
            isOpen={isOpenModal}
            style={customStyle}
            contentLabel='Логин пароль'>

            <div className='form-group'>
                <label htmlFor='name'>Логин</label>
                <input type='text'
                       className='form-control input-small'
                       name='login'
                       value={info.login}/>

                <label htmlFor='inn'>Пароль</label>
                <input type='text'
                       className='form-control input-small'
                       name='password'
                       value={info.password}/>
            </div>

            <a className='btn btn-primary col-md-2 col-md-offset-5' onClick={closeModal}>
                ОК
            </a>
        </Modal>
    )
};

ModalLogin.propTypes = {
    info: PropTypes.object.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ModalLogin;