import React from 'react'
import {connect} from "react-redux"
import Pagination from 'material-ui-pagination'

class PaginationContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
    }

    render() {
        const {total} = this.props
        return (
            <div
                className="pagination">
                <div
                    className="total">
                    {this.state.page * 10 - 9} - {total > (this.state.page % 10) * 10 ? (this.state.page % 10) * 10 : total} из {total}
                </div>
                <Pagination
                    total={total / 10 + 1}
                    display={total / 10 + 1}
                    current={this.state.page}
                    onChange={page => this.setState({
                        page: page
                    })}
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
    }
)(PaginationContainer)