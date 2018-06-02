import React from 'react'
import ResourcesContent from './resources-content'
import ResourcesHeader from './resources-header'
import {CardTitle} from 'material-ui/Card'
import PaginationContainer from '@admin/containers/pagination'

export default class ResourcesList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {title, data, columns, path, page, total} = this.props
        return (
            <div
                className="resource-page">
                <CardTitle
                    title={title}
                />
                <ResourcesHeader
                    path={path}
                />
                <ResourcesContent
                    columns={columns}
                    data={data}
                    path={path}
                    page={page}
                    total={total}
                />
                <PaginationContainer
                    total={total}
                />
            </div>
        )
    }
}