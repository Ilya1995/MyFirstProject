import { combineReducers } from 'redux'
import registration from './registration'
import user from './user'
import messages from './messages'

export default combineReducers({
    registration,
    user,
    messages
})