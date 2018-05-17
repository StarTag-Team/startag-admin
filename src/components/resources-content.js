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
import FalseIcon from 'material-ui/svg-icons/content/clear';
import TrueIcon from 'material-ui/svg-icons/action/done';

export default class ResourcesContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {columns, data, path} = this.props
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
                                    {column.name}
                                </TableHeaderColumn>
                            ))}
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {data.map((data, key) => (
                            <TableRow
                                key={key}
                                className='table__row'
                            >
                                {columns.map((column, key) => {
                                    if (typeof data[column.key] === 'boolean') {
                                        if (data[column.key]) {
                                            return (
                                                <TableRowColumn key={key}>
                                                    <TrueIcon/>
                                                </TableRowColumn>
                                            )
                                        } else {
                                            return (
                                                <TableRowColumn key={key}>
                                                    <FalseIcon/>
                                                </TableRowColumn>
                                            )
                                        }
                                    }
                                    if (column.key instanceof Array) {
                                        return <TableRowColumn key={key}>{data[column.key[0]][column.key[1]]}</TableRowColumn>
                                    }
                                    return <TableRowColumn key={key}>{data[column.key]}</TableRowColumn>
                                })}
                                <TableRowColumn>
                                    <Link
                                        to={`${path}/${data.id}`}
                                    >
                                        <EditIcon
                                            color='rgb(0, 188, 212)'
                                        />
                                    </Link>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <DeleteIcon
                                        color='rgb(255, 64, 129)'
                                    />
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}