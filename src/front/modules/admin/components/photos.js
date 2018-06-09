import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'

export default class Photos extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data} = this.props
        return (
            <GridList
                cellHeight={180}
                cols={4}
                className='photos__gridlist'
            >
                {this.props.data.map((item, key) => {
                    return (
                        <GridTile
                            key={key}
                        >
                            <img
                                src={item.url}
                            />
                        </GridTile>
                    )
                })}
            </GridList>
        )
    }
}