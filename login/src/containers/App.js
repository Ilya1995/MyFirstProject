import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
// import Page from '../components/Page'
import * as userActions from '../actions/UserActions'

class App extends Component {
    render() {
        const { user} = this.props;
        // const { setYear } = this.props.pageActions;
        return <div>
            <User name={user.name} />
            {/*<Send />*/}
            {/*<Page photos={page.photos} year={page.year} setYear={setYear} fetching={page.fetching} />*/}
        </div>
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)