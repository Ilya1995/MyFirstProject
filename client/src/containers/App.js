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
        const { isAuth, name } = this.props.userInfo;

        // const onLogout = () => {
        //     const { logout } = this.props.userActions;
        //     logout();
        // };
        
        return (
            <div>
                <div className='header'>
                    <section id='container'>
                        <nav>
                            <ul className='nav'>
                                <li><NavLink className='nav-icon NavLink' title='Главная'><span className='icon-home'>Главная</span></NavLink></li>
                                <li><NavLink className='NavLink' title='Продукты'>Продукты</NavLink></li>
                                <li><NavLink className='NavLink' title=''>Поддержка</NavLink></li>
                                <li><NavLink className='NavLink' title='Обучение'>Обучение</NavLink></li>
                                <li><NavLink className='NavLink' title='О нас'>О нас</NavLink></li>
                                <li><NavLink className='NavLink' title='Блог'>Блог</NavLink></li>
                                <li><NavLink className='NavLink' title='Контакты'>Контакты</NavLink></li>
                            </ul>
                            {isAuth ?
                                <ul className='nav nav-right'>
                                    <li><NavLink className='NavLink '>Привет, {name}</NavLink></li>
                                    <li></li>
                                </ul> : ''}
                        </nav>
                    </section>


                    {/*<nav className='navbar'>*/}
                        {/*/!*<ul className='nav navbar-nav navbar-left'>*!/*/}
                            {/*/!*<li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>*!/*/}
                        {/*/!*</ul>*!/*/}
                        {/*<ul className='nav navbar-nav navbar-right'>*/}
                            {/*{isAuth ? <li><NavLink to='/account'>Привет, {name}</NavLink></li> : ''}*/}
                        {/*</ul>*/}
                    {/*</nav>*/}
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
