import React from 'react'
import {connect} from "react-redux"

import Data from '@core/data.provider'
import DataActions from '@actions/dataAction'
import Resources from '@components/resources'

class ResourcesLayout extends React.Component {
    constructor(props) {
        super(props)
        this.path = this.props.path
        this.putResourceData = this.props.putResourceData
    }

    async getData(uri) {
        const resource = uri.slice(1)
        const response = await Data.getData(uri)
        let data = {
            resource: response.data[resource],
            total: response.data.total
        }
        this.putResourceData(DataActions.putData(data))
    }

    componentWillMount() {
        this.getData(this.path)
    }

    render() {
        const {columns, title, resources} = this.props
        return (
            <Resources
                columns={columns}
                title={title}
                data={resources.resource || []}
                path={this.path}
                total={resources.total || 0}
                page={resources.page || 1}
            />
        )
    }
}

export default connect(
    store => {
        return {
            resources: store.resources
        }
    },
    dispatch => {
        return {
            putResourceData: (action) => dispatch(action)
        }
    }
)(ResourcesLayout)