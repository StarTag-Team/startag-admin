import React from 'react'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import ResourcesList from './resourcesList/resources'
import resources from '../constants/resources'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            showResourceList: true
        }
    }

    render() {
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