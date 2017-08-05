import { combineReducers } from 'redux'
import registration from './registration'
import user from './user'

export default combineReducers({
    registration,
    user
})