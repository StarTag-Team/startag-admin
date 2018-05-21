import React from 'react'
import AppBar from 'material-ui/AppBar'
import renderRoutes from 'react-router-config/renderRoutes'

import ResourcesList from '@containers/resources'
import Login from '@containers/login'
import Auth from '@core/auth.provider'
import Data from '@core/data.provider'
import resourcesRoutes from '@constants/routes'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuOpened: true,
            authorised: Auth.isAuthorizedSession(),
            allowedResources: null
        }
        this.openMenu = this.openMenu.bind(this)
    }

    async getAllowedResources() {
        const resources = await Data.getAllowedResources()
        if (resources.status === 'success') {
            this.setState({
                allowedResources: resources.allowed
            })
        }
    }

    componentWillMount() {
        Auth.init(
            () => this.setState({authorised: true}),
            () => this.setState({authorised: false})
        )
    }

    componentWillUnmount() {
        Auth.init()
    }

    openMenu() {
        this.setState({
            isMenuOpened: !this.state.isMenuOpened
        })
    }

    render() {
        const {authorised, allowedResources, isMenuOpened} = this.state
        const route = this.props.location.pathname
        if (!authorised) {
            return (
                <Login/>
            )
        }
        if (this.state.allowedResources === null && this.state.authorised) {
            this.getAllowedResources()
        }
        return (
            <div
                className="layout">
                <AppBar
                    title="ForMeToo"
                    onLeftIconButtonClick={this.openMenu}
                />
                <div
                    className="body">
                    <ResourcesList
                        allowedResources={allowedResources || []}
                        isMenuOpened={isMenuOpened}
                    />
                    <div
                        className={isMenuOpened ? "content" : "content_moved"}
                    >
                        {renderRoutes(resourcesRoutes(route))}
                    </div>
                </div>
            </div>
        )
    }
}