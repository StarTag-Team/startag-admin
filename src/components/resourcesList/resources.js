import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {Link} from 'react-router-dom'

import ProfileIcon from 'material-ui/svg-icons/social/people'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'


class ResourcesList extends React.Component {
    constructor(props){
        super(props)
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
                    {
                        this.props.resources.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={item.link}
                                >
                                    <ListItem
                                        primaryText={item.name}
                                        className="list__item"
                                        leftIcon={item.icon}
                                    />
                                </Link>
                            )
                        })
                    }
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
                    <Link
                        to="logout"
                    >
                        <ListItem
                            primaryText="Выйти"
                            className="list__item"
                            leftIcon={<ExitIcon/>}
                        />
                    </Link>
                </div>
            </List>
        )
    }
}

export default ResourcesList