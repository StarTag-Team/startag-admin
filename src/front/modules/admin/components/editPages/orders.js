import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import DatePicker from 'material-ui/DatePicker'

import ToolBar from '@admin/containers/tool-bar'
import Data from '@admin/core/data.provider'

export default class OrdersEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            statuses: [],
            clients: [],
            data: {
                products: [],
                address: {},
                creationDate: new Date(),
                modificationDate: new Date()
            },
            products: [],
            currentStatus: null
        }
        this.getOrder(this.props.location)
        this.getData('/statuses')
        this.getData('/clients')
        this.getData('/products')
        this.changeStatus = this.changeStatus.bind(this)
        this.changeClient = this.changeClient.bind(this)
        this.changeProducts = this.changeProducts.bind(this)
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    changeProducts(event, index, value) {
        this.state.products.forEach((product) => {
            if (product.slug === value) {
                this.changeState([
                    ...this.state.data.products,
                    product
                ], 'products')
            }
        })
    }

    deleteProduct(id) {
        let products = []
        this.state.data.products.map(product => {
            if (product.slug !== id) {
                products.push(product)
            }
        })
        this.changeState(
            products,
            'products'
        )
    }

    changeStatus(event, index, value) {
        this.setState({
            currentStatus: value
        })
        this.state.statuses.forEach(status => {
            if (status.slug === value) {
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
            if (client.slug === value) {
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
                                        value={status.slug}
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
                                        value={client.slug}
                                        primaryText={client.name}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                            <DatePicker
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                floatingLabelText="Дата создания"
                                hintText="Дата создания"
                                defaultDate={new Date(this.state.data.creationDate)}
                            />
                            <DatePicker
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                floatingLabelText="Дата изменения"
                                hintText="Дата изменения"
                                defaultDate={new Date(this.state.data.modificationDate)}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.data.slug}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        slug: value
                                    }
                                })}
                                floatingLabelText='Slug'
                                label='Slug'
                            />
                        </div>
                    </Tab>
                    <Tab label="Продукты">
                        <div
                            className="resource-page">
                            <Table
                                selectable={false}
                            >
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>
                                            Артикул
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Наименование
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Цена
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Количество
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Итого
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                >
                                    {this.state.data.products.map((product, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableRowColumn>
                                                    {product.sku}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    {product.title}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    {product.price}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    {product.count}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    ИТОГО
                                                </TableRowColumn>
                                                <TableHeaderColumn>
                                                    <DeleteIcon
                                                        color='rgb(255, 64, 129)'
                                                        onClick={() => this.deleteProduct(product.slug)}
                                                        style={{cursor: 'pointer'}}
                                                    />
                                                </TableHeaderColumn>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.data.products}
                                floatingLabelText="Похожий продукт"
                                onChange={this.changeProducts}
                            >
                                {this.state.products.map((product, index) => {
                                    return <MenuItem
                                        value={product.slug}
                                        primaryText={product.title}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                        </div>
                    </Tab>
                    <Tab label="Адрес">
                        <div
                            className="resource-page">
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Страна"
                                floatingLabelText="Страна"
                                errorText="Поле обязательно"
                                value={this.state.data.address.country}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.data.address,
                                    country: value
                                }, 'address')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Область"
                                floatingLabelText="Область"
                                errorText="Поле обязательно"
                                value={this.state.data.address.state}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.data.address,
                                    state: value
                                }, 'address')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Город"
                                floatingLabelText="Город"
                                errorText="Поле обязательно"
                                value={this.state.data.address.city}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.data.address,
                                    city: value
                                }, 'address')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Улица"
                                floatingLabelText="Улица"
                                errorText="Поле обязательно"
                                value={this.state.data.address.street}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.data.address,
                                    street: value
                                }, 'address')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Дом"
                                floatingLabelText="Дом"
                                errorText="Поле обязательно"
                                value={this.state.data.address.building}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.data.address,
                                    building: value
                                }, 'address')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Квартира"
                                floatingLabelText="Квартира"
                                value={this.state.data.address.apartment}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.data.address,
                                    apartment: value
                                }, 'address')}
                            />
                        </div>
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