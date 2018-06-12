import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class TabSetsCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                title: '',
                tabs: []
            },
            tabs: []
        }
        this.getTabs()
        this.changeTabs = this.changeTabs.bind(this)
    }

    changeTabs(event, index, value) {
        this.setState({
            data: {
                ...this.state.data,
                tabs: [
                    ...value
                ]
            }
        })
    }

    async getTabs() {
        const response = await Data.getData('/tabs')
        this.setState({
            tabs: response.data
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
                                hintText="Заголовок"
                                onChange={(event, value) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            title: value
                                        }
                                    })
                                }}
                                errorText="Поле обязательно"
                            />
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                multiple={true}
                                value={this.state.data.tabs}
                                floatingLabelText="Табы"
                                onChange={this.changeTabs}
                            >
                                {this.state.tabs.map((tab, index) => {
                                    return <MenuItem
                                        value={tab._id}
                                        primaryText={tab.title}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='tab-sets'
                    data={this.state.data}
                    action='create'
                />
            </div>
        )
    }
}