import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import ToolBar from '@admin/containers/tool-bar'
import Data from '@admin/core/data.provider'

export default class ClientsCreate extends React.Component {
    constructor(props) {
        super(props)
        this.getRole(this.props.location)
        this.state = {
            loaded: false
        }
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    async getRole(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            data: response,
            loaded: true
        })
    }

    render() {
        if (!this.state.loaded) {
            return false
        }
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
                                value={this.state.data.name}
                                hintText="Имя"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'name')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.data.email}
                                hintText="Почта"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'email')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.data.phone}
                                hintText="Телефон"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'phone')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Пароль"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'password')}
                            />
                        </div>
                    </Tab>
                    <Tab label="Адреса">
                        <div
                            className="resource-page">
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='clients'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}