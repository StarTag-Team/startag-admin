import { combineReducers } from 'redux'

import appReducer from './appReducer'

const root = combineReducers({
    app: appReducer
})

export default root