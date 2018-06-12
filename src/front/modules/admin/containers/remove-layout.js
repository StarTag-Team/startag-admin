import React from 'react'

import ToolBar from '@admin/containers/tool-bar'

export default class RemoveLayout extends React.Component {
    render() {
        console.log(1)
        return (
            <div
                className="resource-page">
                <div
                    className="warning-msg"
                >
                    Вы уверены?
                </div>
                <ToolBar
                    action='delete'
                    resource={this.props.location}
                    resources={this.props.resources}
                />
            </div>
        )
    }
}