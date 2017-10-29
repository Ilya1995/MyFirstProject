import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import ReplenishBalance from '../containers/ReplenishBalance'

const ModalBalance = ({isOpenModal, okModal, closeModal}) => {
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
            width                      : '700px',
            height                     : '500px',
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
            contentLabel='Пополнение баланса'>

            <div className='form-group'>
                <ReplenishBalance />
                <div className='footer'>
                    <a className='btn-l btn-blue btn-small' onClick={closeModal}>
                        Отмена
                    </a>
                    <a className='btn-r btn-blue btn-small' onClick={() => okModal()}>
                        Пополнить
                    </a>
                </div>
            </div>
        </Modal>
    )
};

ModalBalance.propTypes = {
    isOpenModal: PropTypes.bool.isRequired,
    okModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ModalBalance;