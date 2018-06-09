import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

import ToolBar from '@admin/containers/tool-bar'

export default class AttributesCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                showInFilter: false,
                showInProductPage: false,
                showInList: false,
                isRequired: false,
                name: null,
                title: null,
                units: null
            }
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
                    <Tab label="Основное">
                        <div
                            className="resource-page">
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в фильтре"
                                onToggle={(event, value) => this.changeState(value, 'showInFilter')}
                            />
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать на странице товара"
                                onToggle={(event, value) => this.changeState(value, 'showInProductPage')}
                            />
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                label="Показывать в списке"
                                onToggle={(event, value) => this.changeState(value, 'showInList')}
                            />
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                label="Обязательный"
                                onToggle={(event, value) => this.changeState(value, 'isRequired')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Наименование"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'name')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Заголовок"
                                errorText="Поле обязательно"
                                onChange={(event, value) => this.changeState(value, 'title')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Единица измерения"
                                errorText="Поле обязательно"
                                onToggle={(event, value) => this.changeState(value, 'units')}
                            />
                        </div>
                    </Tab>
                    <Tab label="Тип">
                        <div
                            className="resource-page">
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='attributes'
                    data={this.state.data}
                    action='create'
                />
            </div>
        )
    }
}