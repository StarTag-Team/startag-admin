import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

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
                    </div>
                </Tab>
            </Tabs>
        )
    }
}