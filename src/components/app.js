import React from 'react'
import AppBar from 'material-ui/AppBar'
import Auth from '@project/core/auth.provider'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import ResourcesList from './resources'
import resources from '../constants/resources'
import Login from '@project/components/login'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            showResourceList: true,
            authorised: Auth.isAuthorizedSession()
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

    render() {
        if (!this.state.authorised) {
            return (
                <Login
                    history={this.props.history}
                />
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
                        resources={resources}
                        showResourceList={this.state.showResourceList}
                    />
                </div>
            </div>
        )
    }
}

export default App