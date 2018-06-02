import { combineReducers } from 'redux'

import resourcesReducer from './resourcesReducer'

const root = combineReducers({
    resources: resourcesReducer
})

export default root