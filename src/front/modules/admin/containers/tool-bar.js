import React from 'react'
import {Toolbar} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import {Redirect} from 'react-router-dom'

import Data from '@admin/core/data.provider'

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            created: false,
            edited: false,
            deleted: false,
            canceled: false
        }
        this.handleSaveButton = this.handleSaveButton.bind(this)
        this.handleRemoveButton = this.handleRemoveButton.bind(this)
        this.handleCancelButton = this.handleCancelButton.bind(this)
        this.handleSaveAndExitButton = this.handleSaveAndExitButton.bind(this)
    }

    handleSaveButton() {
        if (this.props.action === 'create') {
            if (this.props.resources === 'categories') {
                const data = {
                    url: this.props.photo,
                    creationDate: new Date().toLocaleString(),
                    modificationDate: new Date().toLocaleString()
                }
                Data.create('/photos', data)
            }
            const data = this.props.data
            data.creationDate = new Date().toLocaleString()
            data.modificationDate = new Date().toLocaleString()
            Data.create('/' + this.props.resources, data)
        }
        if (this.props.action === 'edit') {
            if (this.props.resources === 'categories') {
                const data = {
                    url: this.props.photo,
                    creationDate: new Date().toLocaleString(),
                    modificationDate: new Date().toLocaleString()
                }
                Data.create('/photos', data)
            }
            const data = this.props.data
            data.modificationDate = new Date().toLocaleString()
            Data.edit('/' + this.props.resources, data)
        }
    }

    handleRemoveButton() {
        Data.remove(this.props.resource)
        this.setState({
            deleted: true
        })
    }

    handleCancelButton() {
        this.setState({
            canceled: true
        })
    }

    handleSaveAndExitButton() {
        if (this.props.action === 'create') {
            if (this.props.resources === 'categories') {
                const data = {
                    url: this.props.photo,
                    creationDate: new Date().toLocaleString(),
                    modificationDate: new Date().toLocaleString()
                }
                Data.create('/photos', data)
            }
            const data = this.props.data
            data.creationDate = new Date().toLocaleString()
            data.modificationDate = new Date().toLocaleString()
            Data.create('/' + this.props.resources, data)
            this.setState({
                created: true
            })
        }
        if (this.props.action === 'edit') {
            if (this.props.resources === 'categories') {
                const data = {
                    url: this.props.photo,
                    creationDate: new Date().toLocaleString(),
                    modificationDate: new Date().toLocaleString()
                }
                Data.create('/photos', data)
            }
            const data = this.props.data
            data.modificationDate = new Date().toLocaleString()
            Data.edit('/' + this.props.resources, data)
            this.setState({
                edited: true
            })
        }
    }

    render() {
        if (this.state.created || this.state.edited || this.state.deleted || this.state.canceled) {
            return (
                <Redirect to={'/' + this.props.resources}/>
            )
        }
        if (this.props.action === 'delete') {
            return (
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <RaisedButton
                        style={{
                            margin: '10px'
                        }}
                        label="Удалить"
                        onClick={this.handleRemoveButton}
                        primary={true}
                    />
                    <RaisedButton
                        style={{
                            margin: '10px'
                        }}
                        label="Отмена"
                        primary={false}
                        onClick={this.handleCancelButton}
                    />
                </Toolbar>
            )
        }
        return (
            <Toolbar
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <RaisedButton
                    style={{
                        margin: '10px'
                    }}
                    label="Сохранить"
                    primary={true}
                    onClick={this.handleSaveButton}
                />
                <RaisedButton
                    style={{
                        margin: '10px'
                    }}
                    label="Сохранить и закрыть"
                    primary={true}
                    onClick={this.handleSaveAndExitButton}
                />
            </Toolbar>
        )
    }
}