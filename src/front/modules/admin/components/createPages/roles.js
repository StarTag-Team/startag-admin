import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

import ToolBar from '@admin/containers/tool-bar'

export default class RolesCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
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
                    <Tab label="Основная информация">
                        <div
                            className="resource-page">
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Название"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'name')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для категорий"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    categories: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    categories: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для продуктов"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    products: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    products: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для пользователей"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    users: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    users: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для ролей"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    roles: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    roles: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для клиентов"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    clients: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    clients: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для заказов"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    orders: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    orders: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для атрибутов"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    attributes: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    attributes: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для набора атрибутов"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    'attribute-sets': {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    'attribute-sets': {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для статусов"
                                errorText="Поле обязательно"

                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    statuses: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    statuses: {showInMenu: value}
                                }, 'resources')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Права для фотографий"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    photos: {permissions: value}
                                }, 'resources')}
                            />
                            <Toggle
                                style={{
                                    width: '230px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в меню"
                                onToggle={(event, value) => this.changeState({
                                    ...this.state.resources,
                                    photos: {showInMenu: value}
                                }, 'resources')}
                            />
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='roles'
                    data={this.state.data}
                />
            </div>
        )
    }
}