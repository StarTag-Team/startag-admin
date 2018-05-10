import '@theme/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Router from 'react-router-dom/Router'
import renderRoutes from 'react-router-config/renderRoutes'
import createBrowserHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store from '@project/store/store'
import routes from '@project/core/routes'

import App from '@components/app'

const history = createBrowserHistory()
history.listen((location, action) => window.scrollTo(0, 0))

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router
                history={history}
            >
                {renderRoutes(routes)}
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)