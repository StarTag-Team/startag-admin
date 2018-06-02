import React from 'react'
import {connect} from "react-redux"

import Data from '@admin/core/data.provider'
import DataActions from '@admin/actions/dataAction'
import Resources from '@admin/components/resources'

class ResourcesLayout extends React.Component {
    constructor(props) {
        super(props)
        this.path = this.props.path
        this.putResourceData = this.props.putResourceData
        this.goPage = this.props.goPage
    }

    async getData(uri) {
        const response = await Data.getData(uri)
        let data = {
            resource: response.data,
            total: response.total
        }
        console.log('data', response)
        this.putResourceData(DataActions.putData(data))
    }

    componentWillMount() {
        this.getData(this.path)
        this.goPage(DataActions.goPage(1))
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
            putResourceData: (action) => dispatch(action),
            goPage: (action) => dispatch(action)
        }
    }
)(ResourcesLayout)