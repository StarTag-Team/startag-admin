import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

import ToolBar from '@admin/containers/tool-bar'

export default class ProductsCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {

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
                                width: '150px',
                                marginLeft: '20px'
                            }}
                            label="Активный"
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
                            onChange={(event, value) => this.changeState({...this.state.data.seo, title: value}, 'seo')}
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="SEO описание"
                            onChange={(event, value) => this.changeState({...this.state.data.seo, description: value}, 'seo')}
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="SEO ключевые слова"
                            onChange={(event, value) => this.changeState({...this.state.data.seo, keywords: value}, 'seo')}
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Slug"
                            errorText="Поле обязательно"
                            onChange={(event, value) => this.changeState(value, 'slug')}
                        />
                    </div>
                </Tab>
                <Tab label="Похожие продукты">
                </Tab>
            </Tabs>
                <ToolBar
                    resources='products'
                    data={this.state.data}
                    action='create'
                />
            </div>
        )
    }
}