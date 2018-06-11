import React from 'react'
import ResourcesContent from './resources-content'
import ResourcesHeader from './resources-header'
import {CardTitle} from 'material-ui/Card'
import PaginationContainer from '@admin/containers/pagination'
import Photos from '@admin/components/photos'

export default class ResourcesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
        this.changePage = this.changePage.bind(this)
    }

    changePage(newPage) {
        this.setState({
            page: newPage
        })
    }

    render() {
        const {title, resources, columns, path, total} = this.props
        const {page} = this.state
        return (
            <div
                className={path === '/photos' ? 'media-resource' : 'resource-page'}
            >
                <CardTitle
                    title={title}
                />
                {path === '/photos' ?
                    <Photos
                        data={resources}
                        total={total}
                        page={page}
                    >
                    </Photos>
                    : <div>
                        <ResourcesHeader
                            path={path}
                            refresh={() => this.props.refresh()}
                        />
                        <ResourcesContent
                            columns={columns}
                            data={resources}
                            path={path}
                            page={page}
                            total={total}
                        />
                        <PaginationContainer
                            total={total}
                            changePage={this.changePage}
                            page={page}
                        />
                    </div>
                }
            </div>
        )
    }
}