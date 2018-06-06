import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

export default class RolesCreate extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tabs>
                <Tab label="Основная информация">
                    <div
                        className="resource-page">
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Название"
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для категорий"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для продуктов"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для пользователей"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для ролей"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для клиентов"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для заказов"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для атрибутов"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для набора атрибутов"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для статусов"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Права для фотографий"
                            errorText="Поле обязательно"
                        />
                        <Toggle
                            style={{
                                width: '230px',
                                marginLeft: '20px'
                            }}
                            label="Показывать в меню"
                        />
                    </div>
                </Tab>
            </Tabs>
        )
    }
}