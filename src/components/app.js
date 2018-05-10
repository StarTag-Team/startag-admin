import React from 'react'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Link} from 'react-router-dom'

import resources from '../constants/resources'

import './app.css'

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
                    title="StarTag"
                    onLeftIconButtonClick={() => {
                        this.setState({
                            showResourceList: !this.state.showResourceList
                        })
                    }}
                />
                <div
                    className="body">
                    <List
                    className={
                        this.state.showResourceList
                            ? "list"
                            : "list_moved"
                    }
                >
                        {
                            resources.map((item, index) => {
                                return (
                                    <Link
                                        to={item.link}
                                    >
                                        <ListItem
                                            primaryText={item.name}
                                            className="list__item"
                                        />
                                    </Link>
                                )
                            })
                        }
                </List>
                    sds
                </div>
            </div>
        )
    }
}

export default App