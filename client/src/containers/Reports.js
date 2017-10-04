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
        //const { client } = this.props.userInfo;
        //console.log(client);

        const RowMessages = ({mess}) => {
            console.log(mess);
            return (
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
            )
        };

        const Messages = ({info}) => {

            return (
                <div>
                    <table className='table table-bordered'>
                        <tbody>
                        <tr>
                            <td className='bg-info'>Дата отправки</td>
                            <td className='bg-info'>Получатель</td>
                            <td className='bg-info'>Статус</td>
                        </tr>
                        {info.map((mess, i) => <RowMessages key={i} mess={mess}/>)}
                        </tbody>
                    </table>
                </div>
            );
        };

        return (
            <div className='form-group'>
                <form id='sendMes-form'>
                    <h3>Доставленные сообщений</h3>
                    <h4 className='text-center page-header'> </h4>
                    <Messages info={[1,2,5,32,342]}/>

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
        userActions: bindActionCreators(userActions, dispatch),
        messageActions: bindActionCreators(messageActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports)