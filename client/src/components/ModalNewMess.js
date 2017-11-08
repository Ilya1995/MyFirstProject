import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import DeliveryOfMessages from '../containers/DeliveryOfMessages'
import Reports from '../containers/Reports'

const ModalNewMess = ({isOpenModal, sendOrReport, okModal, closeModal}) => {
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
            width                      : sendOrReport === 'send' ? '460px' : '550px',
            height                     : '480px',
            borderWidth                : '2px',
            borderColor                : 'black',
            borderRadius               : '5px',
            borderStyle                : 'solid',
            boxShadow                  : '5px 5px 10px rgba(0,0,0,0.5)',
            border                     : '1px solid #ccc',
            background                 : '#fff',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            outline                    : 'none',
            padding                    : '20px',
            margin                     : 'auto'
        }
    };

    return (
        <Modal
            isOpen={isOpenModal}
            style={customStyle}
            contentLabel='Работа с сообщениями'>

            <div>
                {sendOrReport === 'send'
                    ?
                    <div>
                        <DeliveryOfMessages />
                        <div className='footer'>
                            <a className='btn-l btn-blue btn-small' onClick={closeModal}>
                                Отмена
                            </a>
                            <a className='btn-r btn-blue btn-small' onClick={() => okModal({
                                textMess: document.getElementById('textMess').value,
                                subjectMess: document.getElementById('subjectMess') ? document.getElementById('subjectMess').value : null,
                                emailMess: document.getElementById('emailMess') ? document.getElementById('emailMess').value : null,
                                phoneMess: document.getElementById('phoneMess') ? document.getElementById('phoneMess').value : null})}>
                                Отправить
                            </a>
                        </div>
                    </div>
                    :
                    <div>
                        <Reports />
                        <div className='footer'>
                            <a className='btn-l btn-blue btn-small' onClick={closeModal}>
                                Назад
                            </a>
                        </div>
                    </div>}
            </div>
        </Modal>
    )
};

ModalNewMess.propTypes = {
    isOpenModal: PropTypes.bool.isRequired,
    sendOrReport: PropTypes.string.isRequired,
    okModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ModalNewMess;