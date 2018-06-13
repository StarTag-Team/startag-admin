import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import uid from 'uid'

import ToolBar from '@admin/containers/tool-bar'

export default class TabsCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: '',
                title: '',
                slug: uid(16)
            }
        }
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
                                hintText="Наименование"
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        name: value
                                    }
                                })}
                                errorText="Поле обязательно"
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        title: value
                                    }
                                })}
                                hintText="Заголовок"
                                errorText="Поле обязательно"
                            />
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='tabs'
                    data={this.state.data}
                    action='create'
                />
            </div>
        )
    }
}