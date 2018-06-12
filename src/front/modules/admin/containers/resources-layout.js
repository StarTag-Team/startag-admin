import React from 'react'
import {Card} from 'material-ui/Card'

import Data from '@admin/core/data.provider'
import Resources from '@admin/components/resources'

export default class ResourcesLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resources: [],
            total: 0
        }
        this.getData(this.props.path)
    }

    async getData(uri) {
        const response = await Data.getData(uri)
        this.setState({
            resources: response.data,
            total: response.total
        })
    }

    async refresh() {
        const response = await Data.getData(this.props.path)
        this.setState({
            resources: response.data,
            total: response.total
        })
    }

    render() {
        const {resources, total} = this.state
        const {title, path} = this.props
        if (this.props.location === '/photos') {
            return (
                <Card>
                    <Resources
                        title={title}
                        resources={resources}
                        path={path}
                        total={total}
                    />
                </Card>
            )
        }
        const {columns, filters} = this.props
        return (
            <Resources
                columns={columns}
                title={title}
                resources={resources}
                path={path}
                total={total}
                refresh={() => this.refresh()}
                filters={filters}
            />
        )
    }
}