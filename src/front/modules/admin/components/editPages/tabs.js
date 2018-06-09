import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class TabsEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: '',
                title: ''
            }
        }
        this.getData(this.props.location)
    }

    async getData(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            data: response
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Tabs>
                    <Tab label="Основное">
                        <div
                            className="resource-page">
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Наименование"
                                value={this.state.data.name}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        name: value
                                    }
                                })}
                                errorText="Поле обязательно"
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.data.title}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        title: value
                                    }
                                })}
                                hintText="Заголовок"
                                errorText="Поле обязательно"
                            />
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='tabs'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}