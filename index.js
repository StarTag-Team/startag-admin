import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Route, HashRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store from './src/store/store'

import App from './src/index'

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <HashRouter>
                <Route path="/" component={App}/>
            </HashRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)