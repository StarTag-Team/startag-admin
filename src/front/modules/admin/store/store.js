import { createStore } from 'redux'

import rootReducer from '@admin/reducers'

let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() =>
    console.log('store subscribe: ', store.getState())
)

export default store