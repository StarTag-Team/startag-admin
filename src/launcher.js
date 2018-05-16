import '@theme/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Switch, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import renderRoutes from 'react-router-config/renderRoutes'

import store from '@store/store'
import routes from '@core/routes'

const history = createBrowserHistory()
history.listen(() => window.scrollTo(0, 0))
ReactDOM.render(
    <MuiThemeProvider>
        <Provider
            store={store}
        >
            <Router
                history={history}
            >
                {renderRoutes(routes)}
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)