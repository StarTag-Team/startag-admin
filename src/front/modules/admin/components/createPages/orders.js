import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

export default class OrdersCreate extends React.Component {
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
                            hintText="Статус"
                        />
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Заказчик"
                        />
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
        )
    }
}