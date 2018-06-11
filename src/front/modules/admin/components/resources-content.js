/*jslint es6:true*/
import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/content/create'
import {Link} from 'react-router-dom'
import FalseIcon from 'material-ui/svg-icons/content/clear'
import TrueIcon from 'material-ui/svg-icons/action/done'

export default class ResourcesContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ascendingSort: true,
            sortedData: []
        }
    }

    componentWillReceiveProps(nextProps, prevState) {
        this.setState({
            sortedData: nextProps.data
        })
    }

    ascendingSort(key, first, last) {
        if (key !== 'price') {
            return first[key] > last[key]
        }
        return first[key] - last[key]
    }

    descendingSort(key, first, last) {
        if (key !== 'price') {
            return last[key] > first[key]
        }
        return last[key] - first[key]
    }

    sort(resource) {
        if (this.state.ascendingSort) {
            let newData = this.state.sortedData.slice().sort(this.ascendingSort.bind(null, resource.key))
            this.setState({
                sortedData: newData
            })
        } else {
            let newData = this.state.sortedData.slice().sort(this.descendingSort.bind(null, resource.key))
            this.setState({
                sortedData: newData
            })
        }
    }

    render() {
        const {columns, path, page, total} = this.props
        const {sortedData} = this.state
        return (
            <div
                className='table'
            >
                <Table
                    selectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow
                            className='table__row'
                        >
                            {columns.map((column, key) => (
                                <TableHeaderColumn
                                    key={key}
                                    className='table__header__column'
                                >
                                    <div
                                        onClick={() => {
                                            this.sort(column)
                                            this.setState({
                                                ascendingSort: !this.state.ascendingSort
                                            })
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {column.name}
                                    </div>
                                </TableHeaderColumn>
                            ))}
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {sortedData.map((data, key) => {
                            if (((key + 1 >= page * 10 - 9) && ((total > (page % 10) * 10) && (key + 1 <= (page % 10) * 10) || (total <= (page % 10) * 10) && (key + 1 <= total)))) {
                                return (
                                    <TableRow
                                        key={key}
                                        className='table__row'
                                    >
                                        {columns.map((column, i) => {
                                            if (typeof data[column.key] === 'boolean') {
                                                if (data[column.key]) {
                                                    return (
                                                        <TableRowColumn key={i}>
                                                            <TrueIcon/>
                                                        </TableRowColumn>
                                                    )
                                                } else {
                                                    return (
                                                        <TableRowColumn key={i}>
                                                            <FalseIcon/>
                                                        </TableRowColumn>
                                                    )
                                                }
                                            }
                                            if (column.key instanceof Array && !!data[column.key[0]]) {
                                                return (
                                                    <TableRowColumn
                                                        key={i}>
                                                        {data[column.key[0]][column.key[1]]}
                                                    </TableRowColumn>
                                                )
                                            }
                                            return <TableRowColumn key={i}>{data[column.key]}</TableRowColumn>
                                        })}
                                        <TableRowColumn>
                                            <Link
                                                to={`${path}/${data._id}`}
                                            >
                                                <EditIcon
                                                    color='rgb(0, 188, 212)'
                                                />
                                            </Link>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <Link
                                                to={`${path}/${data._id}/delete`}
                                            >
                                                <DeleteIcon
                                                    color='rgb(255, 64, 129)'
                                                />
                                            </Link>
                                        </TableRowColumn>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}