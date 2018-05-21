import React from 'react'
import {connect} from 'react-redux'
import {Card, CardTitle} from 'material-ui/Card'

import Data from '@core/data.provider'
import DataActions from '@actions/dataAction'
import Photos from '@components/photos'

class Media extends React.Component {
    constructor(props) {
        super(props)
        this.path = this.props.route.path
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
        return (
            <Card>
                <CardTitle
                    title='Список фотографий'
                />
                <Photos
                    data={this.props.resources.photos || []}
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
)(Media)