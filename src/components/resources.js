import React from 'react'
import ResourcesContent from './resources-content'
import {CardTitle} from 'material-ui/Card'

export default class ResourcesList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {title, data, columns, path} = this.props
        return (
            <div>
                <CardTitle
                    title={title}
                />
                <ResourcesContent
                    columns={columns}
                    data={data}
                    path={path}
                />
            </div>
        )
    }
}