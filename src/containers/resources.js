import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {Link} from 'react-router-dom'
import ProfileIcon from 'material-ui/svg-icons/social/people'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import DashboardIcon from 'material-ui/svg-icons/action/home'

import Auth from '@project/core/auth.provider'
import resources from '@constants/resources'

class ResourcesList extends React.Component {
    constructor(props) {
        super(props)
        this.basePath = this.props.basePath
    }

    render() {
        return (
            <List
                className={
                    this.props.showResourceList
                        ? "list"
                        : "list_moved"
                }
            >
                <div>
                    <Link
                        to="/"
                    >
                        <ListItem
                            primaryText="Главная страница"
                            className="list__item"
                            leftIcon={<DashboardIcon/>}
                        />
                    </Link>
                    {this.props.allowedResources.map((resource, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/${resource.id}`}
                            >
                                <ListItem
                                    primaryText={resources[resource.id].name}
                                    className="list__item"
                                    leftIcon={resources[resource.id].icon}
                                />
                            </Link>
                        )
                    })}
                </div>
                <div>
                    <Link
                        to="profile"
                    >
                        <ListItem
                            primaryText="Профиль"
                            className="list__item"
                            leftIcon={<ProfileIcon/>}
                        />
                    </Link>
                    <ListItem
                        primaryText="Выйти"
                        className="list__item"
                        leftIcon={<ExitIcon/>}
                        onClick={() => Auth.logout()}
                    />
                </div>
            </List>
        )
    }
}

export default ResourcesList