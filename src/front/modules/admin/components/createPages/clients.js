import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

export default class ClientsCreate extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tabs>
                <Tab label="Основное">
                    <div
                        className="resource-page">
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Имя"
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Почта"
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Телефон"
                            errorText="Поле обязательно"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Пароль"
                            errorText="Поле обязательно"
                        />
                    </div>
                </Tab>
                <Tab label="Адреса">
                    <div
                        className="resource-page">
                    </div>
                </Tab>
            </Tabs>
        )
    }
}