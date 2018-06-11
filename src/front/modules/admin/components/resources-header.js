import React from 'react'
import {cyan500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import {Link} from 'react-router-dom'

export default class ResourcesHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {path} = this.props
        return (
            <div>
                <Link
                    to={`${path}/create`}>
                    <FlatButton
                        label='Создать'
                        primary={true}
                        icon={<AddIcon style={this.iconStyle} color={cyan500}/>}
                    />
                </Link>
                <FlatButton
                    label='Обновить'
                    primary={true}
                    icon={<RefreshIcon style={this.iconStyle} color={cyan500}/>}
                    onClick={() => this.props.refresh()}
                />
            </div>
        )
    }
}