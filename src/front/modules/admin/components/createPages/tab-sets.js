import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import ToolBar from '@admin/containers/tool-bar'

export default class TabSetsCreate extends React.Component {
    constructor(props) {
        super(props)
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
                            hintText="Заголовок"
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Табы"
                            errorText="Поле обязательно"
                        />
                    </div>
                </Tab>
            </Tabs>
                <ToolBar
                    resources='attribute-sets'
                    data={this.state.data}
                    action='create'
                />
            </div>
        )
    }
}