import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'
import Hash from '@admin/core/hash.provider'

export default class UsersEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            data: {
                creationDate: new Date(),
                modificationDate: new Date()
            }
        }
        this.getUser(this.props.location)
        this.getRoles()
        this.changeRole = this.changeRole.bind(this)
        this.changeState = this.changeState.bind(this)
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    async getUser(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            data: response
        })
    }

    changeRole(event, index, value) {
        console.log(value)
        this.setState({
            data: {
                ...this.state.data,
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
        if (!this.state.data) {
            return false
        }
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
                            value={this.state.data.name}
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
                            value={this.state.data.email}
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
                            value={this.state.data.role}
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
                        <DatePicker
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            floatingLabelText="Дата создания"
                            hintText="Дата создания"
                            defaultDate={new Date(this.state.data.creationDate)}
                        />
                        <DatePicker
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            floatingLabelText="Дата изменения"
                            hintText="Дата изменения"
                            defaultDate={new Date(this.state.data.modificationDate)}
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            value={this.state.data.slug}
                            onChange={(event, value) => this.setState({
                                data: {
                                    ...this.state.data,
                                    slug: value
                                }
                            })}
                            floatingLabelText='Slug'
                            label='Slug'
                        />
                    </div>
                </Tab>
            </Tabs>
                <ToolBar
                    resources='users'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}