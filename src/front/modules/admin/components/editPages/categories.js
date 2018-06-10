import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class CategoriesCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            category: {
                image: '',
                title: '',
                description: '',
            },
            image: ''
        }
        this.getCategory(this.props.location)
        this.getCategories()
        this.uploadFile = this.uploadFile.bind(this)
        this.changeParentCategory = this.changeParentCategory.bind(this)
    }

    async uploadFile(file) {
        const result = await Data.uploadImage(file.target.files[0])
        this.setState({
            category: {
                ...this.state.category,
                image: result.url
            },
            image: result.url
        })
    }

    changeParentCategory(event, index, value) {
        console.log(value)
        this.setState({
            category: {
                ...this.state.category,
                parentCategory: value
            }
        })
    }

    changeState(value, key) {
        let newState = this.state
        newState.category[key] = value
        this.setState(newState)
    }

    async getCategory(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            category: response
        })
    }

    async getCategories() {
        const response = await Data.getResource('/categories')
        this.setState({
            categories: response.categories
        })
    }

    render() {
        console.log(this.state)
        if (!this.state.category)
            return false
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
                                toggled={this.state.category.isActive}
                                onToggle={(event, value) => this.changeState(value, 'isActive')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Заголовок"
                                floatingLabelText="Заголовок"
                                errorText="Поле обязательно"
                                value={this.state.category.title}
                                onChange={(event, value) => this.changeState(value, 'title')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Описание"
                                floatingLabelText="Описание"
                                errorText="Поле обязательно"
                                value={this.state.category.description}
                                onChange={(event, value) => this.changeState(value, 'description')}
                            />
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
                                <img
                                    className="inputfile__image"
                                    src={this.state.category.image}
                                />
                            </div>
                            <SelectField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                value={this.state.category.parentCategory}
                                floatingLabelText="Родительская категория"
                                onChange={this.changeParentCategory}
                            >
                                {this.state.categories.map((category, index) => {
                                    return <MenuItem
                                        value={category._id}
                                        primaryText={category.title}
                                        key={index}
                                    />
                                })}
                            </SelectField>
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
                                floatingLabelText="SEO заголовок"
                                value={!!this.state.category.seo ? this.state.category.seo.title : undefined}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.category.seo,
                                    title: value
                                }, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO описание"
                                floatingLabelText="SEO описание"
                                value={!!this.state.category.seo ? this.state.category.seo.description : undefined}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.category.seo,
                                    description: value
                                }, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="SEO ключевые слова"
                                floatingLabelText="SEO ключевые слова"
                                value={!!this.state.category.seo ? this.state.category.seo.keywords : undefined}
                                onChange={(event, value) => this.changeState({
                                    ...this.state.category.seo,
                                    keywords: value
                                }, 'seo')}
                            />
                            <TextField
                                style={{
                                    width: '97%',
                                    marginLeft: '20px',
                                    marginTop: '20px'
                                }}
                                hintText="Slug"
                                errorText="Поле обязательно"
                                floatingLabelText="Slug"
                                value={this.state.category.slug}
                                onChange={(event, value) => this.changeState(value, 'slug')}
                            />
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='categories'
                    data={this.state.category}
                    action='edit'
                    photo={this.state.image}
                />
            </div>
        )
    }
}