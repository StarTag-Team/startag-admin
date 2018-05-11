import React from 'react'
import {white, pinkA200} from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import LockOutline from 'material-ui/svg-icons/action/lock-outline'
import RaisedButton from 'material-ui/RaisedButton'
import Auth from '@project/core/auth.provider'
import Snackbar from 'material-ui/Snackbar'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null
        }
    }

    async login() {
        const {email, password} = this.state
        if (email && password) {
            await Auth.login(email, password)
            this.props.history.push('/')
        } else {
            this.setState({status: 'логин и пароль должны быть заполненными!'})
        }
    }

    render() {
        return (
            <div className='login-layout'>
                <Paper
                    className='login-layout__window'
                >
                    <div>
                        <Avatar
                            icon={<LockOutline/>}
                            color={white}
                            backgroundColor={pinkA200}
                            size={60}
                            className='login-layout__window__avatar'
                        />
                    </div>
                    <TextField
                        floatingLabelText='Имя пользователя'
                        errorText={(this.state.email === '') ? 'обязательно для заполнения' : undefined}
                        onBlur={() => !this.state.email && this.setState({email: ''})}
                        onChange={e => this.setState({email: e.target.value})}
                        type='text' name='username'
                    />
                    <TextField
                        floatingLabelText='Пароль'
                        errorText={(this.state.password === '') ? 'обязательно для заполнения' : undefined}
                        onBlur={() => !this.state.password && this.setState({password: ''})}
                        onChange={e => this.setState({password: e.target.value})}
                        type='password' name='password'
                    />
                    <RaisedButton
                        label="ВОЙТИ"
                        primary={true}
                        className='login-layout__window__button'
                        onClick={() => this.login()}
                    />
                </Paper>
                <Snackbar
                    open={!!this.state.status}
                    message={this.state.status || ''}
                    autoHideDuration={4000}
                    onRequestClose={() => this.setState({status: ''})}
                />
            </div>
        )
    }
}