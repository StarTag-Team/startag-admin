import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'
import Hash from '@admin/core/hash.provider'

export default class UsersCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            user: {}
        }
        this.getRoles()
        this.changeRole = this.changeRole.bind(this)
        this.changeState = this.changeState.bind(this)
    }

    changeState(value, key) {
        let newState = this.state
        newState.user[key] = value
        this.setState(newState)
    }

    changeRole(event, index, value) {
        console.log(value)
        this.setState({
            user: {
                ...this.state.user,
                role: value
            }
        })
    }

    async getRoles() {
        const response = await Data.getData('/roles')
        this.setState({
            roles: response.data
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
                            hintText="Имя"
                            onChange={(event, value) => this.changeState(value, 'name')}
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Почта"
                            onChange={(event, value) => this.changeState(value, 'email')}
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Пароль"
                            onChange={(event, value) => this.changeState(Hash.getHash(value), 'password')}
                            errorText="Поле обязательно"
                        />
                        <SelectField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            value={this.state.user.role}
                            floatingLabelText="Роль"
                            onChange={this.changeRole}
                        >
                            {this.state.roles.map((role, index) => {
                                return <MenuItem
                                    value={role.slug}
                                    primaryText={role.name}
                                    key={index}
                                />
                            })}
                        </SelectField>
                    </div>
                </Tab>
            </Tabs>
                <ToolBar
                    resources="users"
                    data={this.state.user}
                    action='create'
                />
            </div>
        )
    }
}