import React from 'react'

import Data from '@admin/core/data.provider'
import Resources from '@admin/components/resources'

export default class ResourcesLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resources: [],
            total: 0
        }
        this.path = this.props.path
    }

    async getData(uri) {
        const response = await Data.getData(uri)
        this.setState({
            resources: response.data,
            total: response.total
        })
    }

    componentWillMount() {
        this.getData(this.path)
    }

    render() {
        const {columns, title} = this.props
        const {resources, total} = this.state
        const {path} = this
        return (
            <Resources
                columns={columns}
                title={title}
                resources={resources}
                path={path}
                total={total}
            />
        )
    }
}