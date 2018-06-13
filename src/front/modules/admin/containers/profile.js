import React from 'react'
import TextField from 'material-ui/TextField'

import Data from '@admin/core/data.provider'
import ToolBar from '@admin/containers/tool-bar'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: ''
        }
        this.getUser()
            .catch(error => console.error(`Ошибка при получении данных профиля!`))
    }

    async getUser() {
        const result = await Data.getProfile()
        this.setState({
            user: result.profile
        })
        return true
    }

    render() {
        return (
            <div
                className="resource-page">
                <div
                    className="profile__label"
                >
                    Информация профиля
                </div>
                <TextField
                    style={{
                        width: '97%',
                        marginLeft: '20px',
                        marginTop: '20px'
                    }}
                    hintText="Почта"
                    floatingLabelText="Почта"
                    value={this.state.user}
                    onChange={(event, value) => this.setState({
                        user: value
                    })}
                />
                <TextField
                    style={{
                        width: '97%',
                        marginLeft: '20px',
                        marginTop: '20px'
                    }}
                    hintText="Пароль"
                    floatingLabelText="Пароль"
                    onChange={(event, value) => this.setState({
                        password: value
                    })}
                />
                <ToolBar
                    resources='profile'
                    data={this.state}
                    action='edit'
                />
            </div>
        )
    }
}