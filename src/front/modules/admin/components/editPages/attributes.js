import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'


import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class AttributesEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.getAttribute(this.props.location)
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    async getAttribute(url) {
        const response = await Data.getResource(url)
        this.setState({
            data: response
        })
    }

    render() {
        console.log(this.state)
        if (!this.state.data)
            return false
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
                                toggled={this.state.data.showInFilter}
                                label="Показывать в фильтре"
                                onToggle={(event, value) => this.changeState(value, 'showInFilter')}
                            />
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                toggled={this.state.data.showInProductPage}
                                label="Показывать на странице товара"
                                onToggle={(event, value) => this.changeState(value, 'showInProductPage')}
                            />
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                toggled={this.state.data.showInList}
                                label="Показывать в списке"
                                onToggle={(event, value) => this.changeState(value, 'showInList')}
                            />
                            <Toggle
                                style={{
                                    width: '250px',
                                    marginLeft: '20px'
                                }}
                                toggled={this.state.data.isRequired}
                                label="Обязательный"
                                onToggle={(event, value) => this.changeState(value, 'isRequired')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.data.name}
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
                                value={this.state.data.title}
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
                                value={this.state.data.units}
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
                    action='edit'
                />
            </div>
        )
    }
}