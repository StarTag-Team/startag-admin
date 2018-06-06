import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {Link} from 'react-router-dom'
import ProfileIcon from 'material-ui/svg-icons/social/people'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import DashboardIcon from 'material-ui/svg-icons/action/home'

import Auth from '@admin/core/auth.provider'
import resources from '@admin/constants/resources'

export default class ResourcesList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {isMenuOpened, allowedResources, basePath} = this.props
        return (
            <List
                className={
                    isMenuOpened
                        ? "list"
                        : "list_moved"
                }
            >
                <div>
                    <Link
                        to={basePath}
                    >
                        <ListItem
                            primaryText="Главная страница"
                            className="list__item"
                            leftIcon={<DashboardIcon/>}
                        />
                    </Link>
                    {allowedResources.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                to={`${basePath}${item.resource}`}
                            >
                                <ListItem
                                    primaryText={resources[item.resource].name}
                                    className="list__item"
                                    leftIcon={resources[item.resource].icon}
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