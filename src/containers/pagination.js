import React from 'react'
import {connect} from "react-redux"
import Pagination from 'material-ui-pagination'
import DataActions from '@actions/dataAction'

class PaginationContainer extends React.Component {
    constructor(props) {
        super(props)
        this.goNextPage = this.props.goNextPage
        this.goNext = this.goNext.bind(this)
    }

    goNext(page) {
        this.goNextPage(DataActions.goNextPage(page))
    }

    render() {
        const {total} = this.props
        return (
            <div
                className="pagination">
                <div
                    className="total">
                    {this.props.resources.page * 10 - 9} - {total > (this.props.resources.page % 10) * 10 ? (this.props.resources.page % 10) * 10 : total} из {total}
                </div>
                <Pagination
                    total={total / 10 + 1}
                    display={total / 10 + 1}
                    current={this.props.resources.page}
                    onChange={this.goNext}
                />
            </div>
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
            goNextPage: (action) => dispatch(action)
        }
    }
)(PaginationContainer)