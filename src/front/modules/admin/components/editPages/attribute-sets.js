import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Data from '@admin/core/data.provider'

import ToolBar from '@admin/containers/tool-bar'

export default class AttributesCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: '',
                title: ''
            }
        }
        this.getAttributeSet(this.props.location)
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    async getAttributeSet(url) {
        const response = await Data.getResource(url)
        this.setState({
            data: response
        })
    }

    render() {
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
                            errorText="Поле обязательно"
                            value={this.state.data.name}
                            onChange={(event, value) => this.changeState(value, 'name')}
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Заголовок"
                            errorText="Поле обязательно"
                            value={this.state.data.title}
                            onChange={(event, value) => this.changeState(value, 'title')}
                        />
                    </div>
                </Tab>
            </Tabs>
                <ToolBar
                    resources='attribute-sets'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}