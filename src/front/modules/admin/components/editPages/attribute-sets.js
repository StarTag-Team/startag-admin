import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Data from '@admin/core/data.provider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import ToolBar from '@admin/containers/tool-bar'

export default class AttributesCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                title: '',
                attributes: []
            },
            attributes: []
        }
        this.getAttributes()
        this.getAttributeSet(this.props.location)
        this.changeAttribute = this.changeAttribute.bind(this)
    }

    async getAttributes() {
        const response = await Data.getData('/attributes')
        this.setState({
            attributes: response.data
        })
    }

    changeState(value, key) {
        let newState = this.state
        newState.data[key] = value
        this.setState(newState)
    }

    async getAttributeSet(url) {
        const response = await Data.getResource(url)
        this.setState({
            data: response
        })
    }

    changeAttribute(event, index, value) {
        this.setState({
            data: {
                ...this.state.data,
                attributes: [
                    ...value
                ]
            }
        })
    }

    render() {
        return (
            <div>
            <Tabs>
                <Tab label="Основное">
                    <div
                        className="resource-page">
                        <TextField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            hintText="Наименование"
                            errorText="Поле обязательно"
                            value={this.state.data.title}
                            onChange={(event, value) => this.changeState(value, 'title')}
                        />
                        <SelectField
                            style={{
                                width: '97%',
                                marginLeft: '20px',
                                marginTop: '20px'
                            }}
                            multiple={true}
                            value={this.state.data.attributes}
                            floatingLabelText="Атрибуты"
                            onChange={this.changeAttribute}
                        >
                            {this.state.attributes.map((attribute, index) => {
                                return <MenuItem
                                    value={attribute._id}
                                    primaryText={attribute.title}
                                    key={index}
                                />
                            })}
                        </SelectField>
                    </div>
                </Tab>
            </Tabs>
                <ToolBar
                    resources='attribute-sets'
                    data={this.state.data}
                    action='edit'
                />
            </div>
        )
    }
}