import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import ToolBar from '@admin/containers/tool-bar'

export default class ClientsCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                
            }
        }
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
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
                />
            </div>
        )
    }
}