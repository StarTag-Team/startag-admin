import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

export default class AttributesCreate extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
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
                        />
                        <Toggle
                            style={{
                                width: '250px',
                                marginLeft: '20px'
                            }}
                            label="Показывать на странице товара"
                        />
                        <Toggle
                            style={{
                                width: '250px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в списке"
                        />
                        <Toggle
                            style={{
                                width: '250px',
                                marginLeft: '20px'
                            }}
                            label="Обязательный"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Наименование"
                            errorText="Поле обязательно"
                        />
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
                            hintText="Единица измерения"
                            errorText="Поле обязательно"
                        />
                    </div>
                </Tab>
                <Tab label="Тип">
                    <div
                        className="resource-page">
                    </div>
                </Tab>
            </Tabs>
        )
    }
}