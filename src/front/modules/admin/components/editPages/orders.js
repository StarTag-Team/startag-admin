import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import ToolBar from '@admin/containers/tool-bar'
import Data from '@admin/core/data.provider'

export default class OrdersEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            statuses: [],
            clients: [],
            data: {

            },
            currentStatus: null
        }
        this.getOrder(this.props.location)
        this.getData('/statuses')
        this.getData('/clients')
        this.changeStatus = this.changeStatus.bind(this)
        this.changeClient = this.changeClient.bind(this)
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    changeStatus(event, index, value) {
        this.setState({
            currentStatus: value
        })
        this.state.statuses.forEach(status => {
            if (status._id === value) {
                this.setState({
                    data: {
                        ...this.state.data,
                        status: {
                            id: value,
                            name: status.title
                        }
                    }
                })
            }
        })
    }

    async getData(uri) {
        const response = await Data.getData(uri)
        let newState = {}
        newState[uri.slice(1)] = response.data
        this.setState(newState)
    }

    changeClient(event, index, value) {
        this.setState({
            currentClient: value
        })
        this.state.clients.forEach(client => {
            if (client._id === value) {
                this.setState({
                    data: {
                        ...this.state.data,
                        client: {
                            id: value,
                            name: client.name
                        }
                    }
                })
            }
        })
    }

    async getOrder(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            data: response,
            currentStatus: response.status.id,
            currentClient: response.client.id
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
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.currentStatus}
                                floatingLabelText="Статус"
                                onChange={this.changeStatus}
                            >
                                {this.state.statuses.map((status, index) => {
                                    return <MenuItem
                                        value={status._id}
                                        primaryText={status.title}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.currentClient}
                                floatingLabelText="Заказчик"
                                onChange={this.changeClient}
                            >
                                {this.state.clients.map((client, index) => {
                                    return <MenuItem
                                        value={client._id}
                                        primaryText={client.name}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                        </div>
                    </Tab>
                    <Tab label="Продукты">
                        <div
                            className="resource-page">
                        </div>
                    </Tab>
                    <Tab label="Адрес">
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='orders'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}