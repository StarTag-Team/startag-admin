import React from 'react'
import {Card, CardTitle} from 'material-ui/Card'

import Data from '@admin/core/data.provider'
import Resources from '@admin/components/resources'

export default class Media extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resources: [],
            total: 0
        }
        this.path = this.props.path
        this.getData(this.path)
    }

    async getData(uri) {
        const response = await Data.getData(uri)
        let data = {
            resources: response.data,
            total: response.total
        }
        this.setState(data)
    }

    render() {
        const {resources, total} = this.state
        const {title} = this.props
        const {path} = this
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
}