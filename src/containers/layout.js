import React from 'react'
import AppBar from 'material-ui/AppBar'
import renderRoutes from 'react-router-config/renderRoutes'

import ResourcesList from '@containers/resources'
import Login from '@containers/login'
import Auth from '@core/auth.provider'
import Data from '@core/data.provider'
import resourcesRoutes from '@constants/routes'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.basePath = this.props.route.path
        this.state = {
            showResourceList: true,
            authorised: Auth.isAuthorizedSession(),
            allowedResources: []
        }
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
        this.getAllowedResources()
    }

    componentWillUnmount() {
        Auth.init()
    }

    render() {
        if (!this.state.authorised) {
            return (
                <Login/>
            )
        }
        return (
            <div>
                <AppBar
                    title="ForMeToo"
                    onLeftIconButtonClick={() => {
                        this.setState({
                            showResourceList: !this.state.showResourceList
                        })
                    }}
                />
                <div
                    className="body">
                    <ResourcesList
                        allowedResources={!!this.state.allowedResources ? this.state.allowedResources : []}
                        showResourceList={this.state.showResourceList}
                        basePath={this.basePath}
                    />
                    <div
                        className={this.state.showResourceList ? "content" : "content_moved"}
                    >
                        {renderRoutes(resourcesRoutes(this.basePath))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout