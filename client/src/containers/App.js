import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavLink from '../components/NavLink'
import * as userActions from '../actions/UserActions'

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        const { isAuth } = this.props.userInfo;

        const onLogout = () => {
            const { logout } = this.props.userActions;
            logout();
        };
        
        return (
            <div>
                <div className='header'>
                    <nav className='navbar'>
                        <ul className='nav navbar-nav navbar-left'>
                            <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            {isAuth ? <li><NavLink to='/account'>Личный кабинет</NavLink></li> : ''}
                            {isAuth ? <li><a href='#' onClick={onLogout}>Выйти</a></li> :
                                <li><NavLink to='/login'>Войти</NavLink></li>}
                        </ul>
                    </nav>
                </div>
                <div className='substrate'>
                </div>

                {this.props.children}
            </div>
        )
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
        userActions: bindActionCreators(userActions, dispatch)
    }
};

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
