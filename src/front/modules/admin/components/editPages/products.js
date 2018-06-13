import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
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
import uid from 'uid'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class ProductsEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                slug: uid(16)
            },
            products: []
        }
        this.getProduct(this.props.location)
        this.getResource('/products')
        this.getResource('/categories')
        this.getResource('/attribute-sets')
        this.getResource('/tab-sets')
        this.changeRelatedProducts = this.changeRelatedProducts.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.changeCategories = this.changeCategories.bind(this)
        this.changeAttributeSets = this.changeAttributeSets.bind(this)
        this.changeTabSets = this.changeTabSets.bind(this)
    }

    async getProduct(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            data: response
        })
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    changeRelatedProducts(event, index, value) {
        this.state.products.forEach((product) => {
            if (product.slug === value) {
                this.changeState([
                    ...this.state.data.relatedProducts,
                    product
                ], 'relatedProducts')
            }
        })
    }

    deleteRelatedProduct(id) {
        let relatedProducts = []
        this.state.data.relatedProducts.map(relatedProduct => {
            if (relatedProduct.slug !== id) {
                relatedProducts.push(relatedProduct)
            }
        })
        this.changeState(
            relatedProducts,
            'relatedProducts'
        )
    }

    async uploadFile(file) {
        const result = await Data.uploadImage(file.target.files[0])
        this.setState({
            data: {
                ...this.state.data,
                images: {
                    ...this.state.data.images,
                    ...result
                }
            }
        })
    }

    async getResource(uri) {
        const resource = uri.slice(1)
        const response = await Data.getData(uri)
        let newState = {}
        newState[resource] = response.data
        this.setState(newState)
    }

    changeCategories(event, index, value) {
        this.setState({
            data: {
                ...this.state.data,
                categories: [
                    ...this.state.data.categories,
                    ...value
                ]
            }
        })
    }

    changeAttributeSets(event, index, value) {
        this.setState({
            data: {
                ...this.state.data,
                'attribute-sets': [
                    ...this.state.data['attribute-sets'],
                    ...value
                ]
            }
        })
    }

    changeTabSets(event, index, value) {
        this.setState({
            data: {
                ...this.state.data,
                'tab-sets': [
                    ...this.state.data['tab-sets'],
                    ...value
                ]
            }
        })
    }


    render() {
        if (!this.state.data || !this.state.categories || !this.state['attribute-sets'] || !this.state['tab-sets']) {
            return false
        }
        return (
            <div>
                <Tabs>
                    <Tab label="Основное">
                        <div
                            className="big-resource">
                            <Toggle
                                style={{
                                    width: '150px',
                                    marginLeft: '20px'
                                }}
                                label="Активный"
                                toggled={this.state.data.isActive}
                                onToggle={(event, value) => this.changeState(value, 'isActive')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Заголовок"
                                errorText="Поле обязательно"
                                value={this.state.data.title}
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
                                value={this.state.data.description}
                                onChange={(event, value) => this.changeState(value, 'description')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Краткое описание"
                                errorText="Поле обязательно"
                                value={this.state.data.shortDescription}
                                onChange={(event, value) => this.changeState(value, 'shortDescription')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="sku"
                                errorText="Поле обязательно"
                                value={this.state.data.sku}
                                onChange={(event, value) => this.changeState(value, 'sku')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Цена"
                                errorText="Поле обязательно"
                                value={this.state.data.price}
                                onChange={(event, value) => this.changeState(value, 'price')}
                            />
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                multiple={true}
                                value={this.state.data.categories}
                                floatingLabelText="Категории"
                                onChange={this.changeCategories}
                            >
                                {this.state.categories.map((category, index) => {
                                    return <MenuItem
                                        value={category.slug}
                                        primaryText={category.title}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                            <input
                                type="file"
                                className="inputfile"
                                id="file"
                                onChange={this.uploadFile}
                            />
                            <label
                                htmlFor="file"
                                className="inputfile__label"
                            >
                                Перенесите сюда файл или нажмите, чтобы выбрать изображение
                            </label>
                            <div
                                className="inputfile__images"
                            >
                                {this.state.data.images.map((image, index) => {
                                    return (
                                        <img
                                            className="inputfile__image"
                                            src={image.url}
                                            key={index}
                                        />
                                    )
                                })}
                            </div>
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                multiple={true}
                                value={this.state.data['attribute-sets']}
                                floatingLabelText="Наборы атрибутов"
                                onChange={this.changeAttributeSets}
                            >
                                {this.state['attribute-sets'].map((attribute, index) => {
                                    return <MenuItem
                                        value={attribute.slug}
                                        primaryText={attribute.title}
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
                                multiple={true}
                                value={this.state.data['tab-sets']}
                                floatingLabelText="Наборы табов"
                                onChange={this.changeTabSets}
                            >
                                {this.state['tab-sets'].map((set, index) => {
                                    return <MenuItem
                                        value={set.slug}
                                        primaryText={set.title}
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
                                value={!!this.state.data.seo ? this.state.data.seo.title : undefined}
                                onChange={(event, value) => this.changeState({...this.state.data.seo, title: value}, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO описание"
                                value={!!this.state.data.seo ? this.state.data.seo.description : undefined}
                                onChange={(event, value) => this.changeState({...this.state.data.seo, description: value}, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO ключевые слова"
                                value={!!this.state.data.seo ? this.state.data.seo.keywords : undefined}
                                onChange={(event, value) => this.changeState({...this.state.data.seo, keywords: value}, 'seo')}
                            />
                        </div>
                    </Tab>
                    <Tab label="Похожие продукты">
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
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                >
                                    {this.state.data.relatedProducts.map((product, index) => {
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
                                                <TableHeaderColumn>
                                                    <DeleteIcon
                                                        color='rgb(255, 64, 129)'
                                                        onClick={() => this.deleteRelatedProduct(product.slug)}
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
                                value={this.state.data.relatedProducts}
                                floatingLabelText="Похожий продукт"
                                onChange={this.changeRelatedProducts}
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
                </Tabs>
                <ToolBar
                    resources='products'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}