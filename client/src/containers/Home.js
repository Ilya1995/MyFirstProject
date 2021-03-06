import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NotificationContainer } from 'react-notifications';
import * as userActions from '../actions/UserActions'
import * as registrationActions from '../actions/RegistrationActions'
import FormAut from '../containers/FormAut'
// import DeliveryOfMessages from '../containers/DeliveryOfMessages'

//import { Link } from 'react-router'
//import 'react-notifications/lib/notifications.css';


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
        const { isAuth } = this.props.userInfo;

        return (
            <div>

                {isAuth ? '' : <FormAut />}
                {/*<DeliveryOfMessages />*/}
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
