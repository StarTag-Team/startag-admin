import '@theme/index.css'
console.log(1)
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import renderRoutes from 'react-router-config/renderRoutes'

import store from '@admin/store'
import routes from '@common/core/routes'

ReactDOM.render(
    <MuiThemeProvider>
        <Provider
            store={store}
        >
            <HashRouter>
                {renderRoutes(routes)}
            </HashRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)