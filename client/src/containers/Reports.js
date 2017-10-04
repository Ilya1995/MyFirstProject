import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-notifications/lib/notifications.css';
import * as userActions from '../actions/UserActions';
import * as messageActions from '../actions/MessageActions'

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSendEmail: true
        }
    }

    componentDidMount() {
        const { getMessages } = this.props.messageActions;
        getMessages();
    }

    render() {

        const RowMessages = ({num, mess}) => {
            return (
                <tr>
                    <td>{num+1}</td>
                    <td>{mess.dispatch_time}</td>
                    <td>{mess.to}</td>
                    <td>{mess.status ? 'Отправлено' : 'Ошибка'}</td>
                </tr>
            )
        };

        const Messages = ({info}) => {
            console.log(info);
            return (
                <div className='scrol-table'>
                    <table className='table table-bordered'>
                        <tbody>
                        <tr>
                            <td className='bg-info'>№</td>
                            <td className='bg-info'>Дата отправки</td>
                            <td className='bg-info'>Получатель</td>
                            <td className='bg-info'>Статус</td>
                        </tr>
                        {info.map((mess, i) => <RowMessages num={i} mess={mess} />)}
                        </tbody>
                    </table>
                </div>
            );
        };

        return (
            <div className='form-group'>
                <form id='sendMes-form'>


                    {this.props.messages ?
                        <div>
                            <h3>Доставленные сообщений</h3>
                            <h4 className='text-center page-header'> </h4>
                            <Messages info={this.props.messages}/>
                        </div>
                        :
                        <div>
                            <h3>Нет доставленных сообщений</h3>
                        </div>
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user,
        messages: state.messages.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        messageActions: bindActionCreators(messageActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports)