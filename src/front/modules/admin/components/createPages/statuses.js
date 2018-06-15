import React from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ListIcon from 'material-ui/svg-icons/action/list'

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
                            <Link
                                className="resource-actions"
                                to="/statuses"
                            >
                                <FlatButton
                                    label="Назад к списку"
                                    primary={true}
                                    icon={<ListIcon/>}
                                />
                            </Link>
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