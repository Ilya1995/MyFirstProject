import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-notifications/lib/notifications.css';
import * as userActions from '../actions/UserActions';

class Reports extends Component {
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
                    <h3>Доставленные сообщений</h3>

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

export default connect(mapStateToProps, mapDispatchToProps)(Reports)