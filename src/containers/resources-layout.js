import React from 'react'
import {connect} from "react-redux"
import {Card} from 'material-ui/Card'

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
        let data = {}
        data[resource] = response.data[resource]
        this.putResourceData(DataActions.putData(data))
    }

    componentWillMount() {
        this.getData(this.path)
    }

    render() {
        const {columns, title, resources} = this.props
        return (
            <Card>
                <Resources
                    columns={columns}
                    title={title}
                    data={resources[this.path.slice(1)] || []}
                    path={this.path}
                />
            </Card>
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