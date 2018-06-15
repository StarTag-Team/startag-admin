import React from 'react'
import ReactDOM from 'react-dom'
import {
    HashRouter
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import renderRoutes from 'react-router-config/renderRoutes'

import '@theme/index.css'
import routes from '@common/core/routes'

ReactDOM.render(
    <MuiThemeProvider>
        <HashRouter>
            {renderRoutes(routes)}
        </HashRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
)