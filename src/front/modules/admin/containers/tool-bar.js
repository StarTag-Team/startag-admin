import React from 'react'
import {Toolbar} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'

import Data from '@admin/core/data.provider'

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleSaveButton = this.handleSaveButton.bind(this)
    }

    handleSaveButton() {
        if (this.props.action === 'create') {
            Data.create('/' + this.props.resources, this.props.data)
        }
        if (this.props.action === 'edit') {
            Data.edit('/' + this.props.resources, this.props.data)
        }
    }

    handleSaveAndExitButton() {

    }

    render() {
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
                />
            </Toolbar>
        )
    }
}