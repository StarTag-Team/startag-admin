import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class ProductsEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
        this.getProduct(this.props.location)
        this.getProducts()
    }

    changeState(value, key) {
        let newState = this.state
        newState.product[key] = value
        this.setState(newState)
    }

    async getProduct(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            product: response
        })
    }

    async getProducts() {
        const response = await Data.getResource('/products')
        this.setState({
            products: response.products
        })
    }

    render() {
        console.log(this.state)
        if (!this.state.product) {
            return false
        }
        return (
            <div>
                <Tabs>
                    <Tab label="Основное">
                        <div
                            className="resource-page">
                            <Toggle
                                style={{
                                    width: '150px',
                                    marginLeft: '20px'
                                }}
                                label="Активный"
                                toggled={this.state.product.isActive}
                                onChange={(event, value) => this.changeState(value, 'isActive')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Заголовок"
                                errorText="Поле обязательно"
                                value={this.state.product.title}
                                onChange={(event, value) => this.changeState(value, 'title')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Описание"
                                errorText="Поле обязательно"
                                value={this.state.product.description}
                                onChange={(event, value) => this.changeState(value, 'description')}
                            />
                        </div>
                    </Tab>
                    <Tab label="SEO">
                        <div
                            className="resource-page">
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO заголовок"
                                value={!!this.state.product.seo ? this.state.product.seo.title : undefined}
                                onChange={(event, value) => this.changeState({...this.state.product.seo, title: value}, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO описание"
                                value={!!this.state.product.seo ? this.state.product.seo.description : undefined}
                                onChange={(event, value) => this.changeState({...this.state.product.seo, description: value}, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO ключевые слова"
                                value={!!this.state.product.seo ? this.state.product.seo.keywords : undefined}
                                onChange={(event, value) => this.changeState({...this.state.product.seo, keywords: value}, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Slug"
                                errorText="Поле обязательно"
                                value={this.state.product.slug}
                                onChange={(event, value) => this.changeState(value, 'slug')}
                            />
                        </div>
                    </Tab>
                    <Tab label="Похожие продукты">
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='products'
                    data={this.state.product}
                    action='edit'
                />
            </div>
        )
    }
}