import React from 'react'
import AppBar from 'material-ui/AppBar'
import renderRoutes from 'react-router-config/renderRoutes'

import ResourcesList from '@admin/containers/resources'
import Login from '@admin/containers/login'
import Auth from '@admin/core/auth.provider'
import Data from '@admin/core/data.provider'
import routes from '@admin/constants/routes/index'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuOpened: true,
            authorised: Auth.isAuthorizedSession(),
            allowedResources: []
        }
        this.getAllowedResources()
        this.openMenu = this.openMenu.bind(this)
    }

    async getAllowedResources() {
        const resources = await Data.getAllowedResources()
        if (resources.success)
            this.setState({
                allowedResources: resources.allowed
            })
        return true
    }

    componentWillMount() {
        Auth.init(
            () => this.setState({
                authorised: true
            }),
            () => this.setState({
                authorised: false
            })
        )
    }

    componentWillUnmount() {
        Auth.init()
    }

    openMenu() {
        const {isMenuOpened} = this.state
        this.setState({
            isMenuOpened: !isMenuOpened
        })
        return true
    }

    render() {
        const {authorised, allowedResources, isMenuOpened} = this.state
        const location = this.props.location.pathname
        const route = this.props.route.path
        if (!authorised) {
            return <Login/>
        }
        return (
            <div
                className="layout"
            >
                <AppBar
                    title="ForMeToo"
                    onLeftIconButtonClick={this.openMenu}
                    style={{
                        height: 60
                    }}
                />
                <div
                    className="body"
                >
                    <ResourcesList
                        allowedResources={allowedResources}
                        isMenuOpened={isMenuOpened}
                        basePath={route}
                    />
                    <div
                        className={
                            isMenuOpened
                                ? "content"
                                : "content_moved"
                        }
                    >
                        {renderRoutes(routes(location, route))}
                    </div>
                </div>
            </div>
        )
    }
}