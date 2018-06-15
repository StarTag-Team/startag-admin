import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class CategoriesCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            data: {
                isActive: false,
                title: '',
                description: '',
                image: '',
                parentCategory: '',
                slug: '',
                seo: {
                    title: '',
                    description: '',
                    keywords: ''
                },
                creationDate: new Date(),
                modificationDate: new Date()
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
            data: {
                ...this.state.data,
                image: result.url
            },
            image: result.url
        })
    }

    changeParentCategory(event, index, value) {
        this.setState({
            data: {
                ...this.state.data,
                parentCategory: value
            }
        })
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    async getCategory(uri) {
        const response = await Data.getResource(uri)
        this.setState({
            data: response
        })
    }

    async getCategories() {
        const response = await Data.getResource('/categories')
        this.setState({
            categories: response.categories
        })
    }

    render() {
        if (!this.state.data)
            return false
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
                                onToggle={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        isActive: value
                                    }
                                })}
                            />
                            <TextField
                                fullWidth={true}
                                hintText="Заголовок"
                                floatingLabelText="Заголовок"
                                errorText="Поле обязательно"
                                value={this.state.data.title}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        title: value
                                    }
                                })}
                            />
                            <TextField
                                fullWidth={true}
                                hintText="Описание"
                                floatingLabelText="Описание"
                                errorText="Поле обязательно"
                                value={this.state.data.description}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        description: value
                                    }
                                })}
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
                                    src={this.state.data.image}
                                />
                            </div>
                            <SelectField
                                fullWidth={true}
                                value={this.state.data.parentCategory}
                                floatingLabelText="Родительская категория"
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        parentCategory: value
                                    }
                                })}
                            >
                                {this.state.categories.map((category, index) => {
                                    return <MenuItem
                                        value={category.slug}
                                        primaryText={category.title}
                                        key={index}
                                    />
                                })}
                            </SelectField>
                            <DatePicker
                                fullWidth={true}
                                floatingLabelText="Дата создания"
                                hintText="Дата создания"
                                defaultDate={new Date(this.state.data.creationDate)}
                            />
                            <DatePicker
                                fullWidth={true}
                                floatingLabelText="Дата изменения"
                                hintText="Дата изменения"
                                defaultDate={new Date(this.state.data.modificationDate)}
                            />
                            <TextField
                                fullWidth={true}
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
                                fullWidth={true}
                                hintText="SEO заголовок"
                                floatingLabelText="SEO заголовок"
                                value={this.state.data.seo.title}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        seo: {
                                            ...this.state.data.seo,
                                            title: value
                                        }
                                    }
                                })}
                            />
                            <TextField
                                fullWidth={true}
                                hintText="SEO описание"
                                floatingLabelText="SEO описание"
                                value={!!this.state.data.seo ? this.state.data.seo.description : undefined}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        seo: {
                                            ...this.state.data.seo,
                                            description: value
                                        }
                                    }
                                })}
                            />
                            <TextField
                                fullWidth={true}
                                hintText="SEO ключевые слова"
                                floatingLabelText="SEO ключевые слова"
                                value={!!this.state.data.seo ? this.state.data.seo.keywords : undefined}
                                onChange={(event, value) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        seo: {
                                            ...this.state.data.seo,
                                            keywords: value
                                        }
                                    }
                                })}
                            />
                        </div>
                    </Tab>
                </Tabs>
                <ToolBar
                    resources='categories'
                    data={this.state.data}
                    action='edit'
                    photo={this.state.image}
                />
            </div>
        )
    }
}