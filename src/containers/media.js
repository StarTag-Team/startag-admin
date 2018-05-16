import React from 'react'
import {connect} from 'react-redux'
import {Card, CardTitle} from 'material-ui/Card'

import Photos from '@components/photos'
import DataActions from '@actions/dataAction'
import Data from '@core/data.provider'

class Media extends React.Component {
    constructor(props) {
        super(props)
        this.path = this.props.route.path
    }

    async getPhotos(uri) {
        const response = await Data.getData(uri)
        const data = {
            photos: response.data.photos
        }
        this.props.putResourceData(DataActions._putData(data))
    }

    componentWillMount() {
        this.getPhotos(this.path)
    }

    render() {
        return (
            <Card>
                <CardTitle
                    title='Список фотографий'
                />
                <Photos
                    data={!!this.props.resources ? this.props.resources.photos : []}
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