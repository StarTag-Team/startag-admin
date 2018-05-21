import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'

export default class Photos extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <GridList
                cellHeight={180}
                cols={4}
                className='photos__gridlist'
            >
                {!!this.props.data
                    ? this.props.data.map((item, key) => (
                        <GridTile
                            key={key}
                        >
                            <img
                                src={item.url}
                            />
                        </GridTile>
                    ))
                    : null}
            </GridList>
        )
    }
}