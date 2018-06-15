import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import ToolBar from '@admin/containers/tool-bar'

export default class TabSetsCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                title: ''
            }
        }
    }

    render() {
        return (
            <div>
                <Tabs>
                    <Tab label="Основное">
                        <div
                            className="resource-page">
                            <TextField
                                fullWidth={true}
                                onChange={(event, value) => {
                                    this.setState({
                                        data: {
                                            title: value
                                        }
                                    })
                                }}
                                hintText="Заголовок(наименование)"
                                errorText="Поле обязательно"
                            />
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='statuses'
                    data={this.state.data}
                    action='create'
                />
            </div>
        )
    }
}