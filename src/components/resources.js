import React from 'react'
import ResourcesContent from './resources-content'
import {CardTitle} from 'material-ui/Card'
import PaginationContainer from '@containers/pagination'

export default class ResourcesList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {title, data, columns, path, total} = this.props
        return (
            <div
                className="resource-page">
                <CardTitle
                    title={title}
                />
                <ResourcesContent
                    columns={columns}
                    data={data}
                    path={path}
                />
                <PaginationContainer
                    total={total}
                />
            </div>
        )
    }
}