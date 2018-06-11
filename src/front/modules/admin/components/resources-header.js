import React from 'react'
import {cyan500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import {Link} from 'react-router-dom'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'

import Data from '@admin/core/data.provider'

export default class ResourcesHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: [],
            title: false,
            type: false,
            isRequired: false,
            showInFilter: false,
            creationDateStart: false,
            creationDateEnd: false,
            modificationDateStart: false,
            modificationDateEnd: false,
            sku: false,
            category: false,
            'attribute-sets': false,
            filtration: {
                type: ''
            }
        }
        this.addFilter = this.addFilter.bind(this)
    }

    async addFilter(event, index, value) {
        switch (value) {
            case 'title':
                if (!this.state.title) {
                    const search = (
                        <TextField
                            hintText='Заголовок'
                            floatingLabelText='Заголовок'
                            onChange={(event, value) => this.props.addFiltration('title', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        title: true
                    })
                }
                break
            case 'sku':
                if (!this.state.sku) {
                    const search = (
                        <TextField
                            hintText='Артикул'
                            floatingLabelText='Артикул'
                            onChange={(event, value) => this.props.addFiltration('sku', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        sku: true
                    })
                }
                break
            case 'type':
                const variants = [
                    {
                        id: 'multipleSelect',
                        title: 'Множественный список'
                    }, {
                        id: 'textInput',
                        title: 'Текстовое поле'
                    }, {
                        id: 'select',
                        title: 'Список'
                    }, {
                        id: 'numberInput',
                        title: 'Числовое поле'
                    }, {
                        id: 'textBlock',
                        title: 'Текстовый блок'
                    }, {
                        id: 'boolean',
                        title: 'Да/Нет'
                    }
                ]
                if (!this.state.type) {
                    const search = (
                        <SelectField
                            floatingLabelText='Тип'
                            onChange={(event, index, value) => this.props.addFiltration('attrType', value)}
                        >
                            {variants.map((variant, index) => {
                                return (
                                    <MenuItem
                                        value={variant.id}
                                        primaryText={variant.title}
                                        key={index}
                                    />
                                )
                            })}
                        </SelectField>
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        type: true
                    })
                }
                break
            case 'isRequired':
                if (!this.state.isRequired) {
                    const search = (
                        <Toggle
                            label="Обязательный"
                            style={{
                                maxWidth: 250,
                                marginTop: 40
                            }}
                            onToggle={(event, value) => this.props.addFiltration('isRequired', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        isRequired: true
                    })
                }
                break
            case 'isActive':
                if (!this.state.isActive) {
                    const search = (
                        <Toggle
                            label="Активный"
                            style={{
                                maxWidth: 250,
                                marginTop: 40
                            }}
                            onToggle={(event, value) => this.props.addFiltration('isActive', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        isActive: true
                    })
                }
                break
            case 'showInFilter':
                if (!this.state.showInFilter) {
                    console.log(1)
                    const search = (
                        <Toggle
                            label="Показывать в фильтре"
                            style={{
                                maxWidth: 250,
                                marginTop: 40
                            }}
                            onToggle={(event, value) => this.props.addFiltration('showInFilter', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        showInFilter: true
                    })
                }
                break
            case 'creationDateStart':
                if (!this.state.creationDateStart) {
                    const search = (
                        <DatePicker
                            hintText="Дата создания от"
                            style={{
                                marginTop: 40
                            }}
                            onChange={(event, value) => this.props.addFiltration('creationDateStart', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        creationDateUp: true
                    })
                }
                break
            case 'creationDateEnd':
                if (!this.state.creationDateEnd) {
                    const search = (
                        <DatePicker
                            hintText="Дата создания до"
                            style={{
                                marginTop: 40
                            }}
                            onChange={(event, value) => this.props.addFiltration('creationDateEnd', value.toLocaleString())}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        creationDateEnd: true
                    })
                }
                break
            case 'modificationDateStart':
                if (!this.state.modificationDateStart) {
                    const search = (
                        <DatePicker
                            hintText="Дата изменения от"
                            style={{
                                marginTop: 40
                            }}
                            onChange={(event, value) => this.props.addFiltration('modificationDateStart', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        modificationDateStart: true
                    })
                }
                break
            case 'modificationDateEnd':
                if (!this.state.modificationDateEnd) {
                    const search = (
                        <DatePicker
                            hintText="Дата изменения от"
                            style={{
                                marginTop: 40
                            }}
                            onChange={(event, value) => this.props.addFiltration('modificationDateEnd', value.toLocaleString())}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        modificationDateEnd: true
                    })
                }
                break
            case 'attribute-sets':
                if (!this.state['attribute-sets']) {
                    const result = await Data.getResource('/attribute-sets')
                    const search = (
                        <SelectField
                            floatingLabelText='Набор атрибутов'
                            value={this.state.filtration.type}
                            onChange={(event, index, value) => this.props.addFiltration('attribute-sets', value)}
                        >
                            {result['attribute-sets'].map((set, index) => {
                                return (
                                    <MenuItem
                                        value={set._id}
                                        primaryText={set.title}
                                        key={index}
                                    />
                                )
                            })}
                        </SelectField>
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        'attribute-sets': true
                    })
                }
                break
            case 'category':
                if (!this.state.category) {
                    const result = await Data.getResource('/categories')
                    const search = (
                        <SelectField
                            floatingLabelText='Категория'
                            value={this.state.filtration.type}
                            onChange={(event, index, value) => this.props.addFiltration('categories', value)}
                        >
                            {result.categories.map((category, index) => {
                                return (
                                    <MenuItem
                                        value={category._id}
                                        primaryText={category.title}
                                        key={index}
                                    />
                                )
                            })}
                        </SelectField>
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        category: true
                    })
                }
                break
            case 'priceStart':
                if (!this.state.priceStart) {
                    const search = (
                        <TextField
                            hintText='Цена от'
                            floatingLabelText='Цена от'
                            onChange={(event, value) => this.props.addFiltration('priceStart', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        priceStart: true
                    })
                }
                break
            case 'priceEnd':
                if (!this.state.priceEnd) {
                    const search = (
                        <TextField
                            hintText='Цена до'
                            floatingLabelText='Цена до'
                            onChange={(event, value) => this.props.addFiltration('priceEnd', value)}
                        />
                    )
                    this.setState({
                        filters: [
                            ...this.state.filters,
                            search
                        ],
                        priceEnd: true
                    })
                }
                break
        }
    }

    render() {
        const {path} = this.props
        return (
            <div>
                <div
                    className='resource-headline'
                >
                    {this.props.title}
                    <div
                        className='resource-buttons'
                    >
                        <Link
                            to={`${path}/create`}>
                            <FlatButton
                                label='Создать'
                                primary={true}
                                icon={<AddIcon style={this.iconStyle} color={cyan500}/>}
                            />
                        </Link>
                        <FlatButton
                            label='Обновить'
                            primary={true}
                            icon={<RefreshIcon style={this.iconStyle} color={cyan500}/>}
                            onClick={() => this.props.refresh()}
                        />
                    </div>
                </div>
                <div
                    className='resource-filters'
                >
                    <SelectField
                        floatingLabelText='Фильтры'
                        onChange={this.addFilter}
                    >
                        {this.props.filters.map((filter, index) => {
                            return (
                                <MenuItem
                                    value={filter.type}
                                    primaryText={filter.title}
                                    key={index}
                                />
                            )
                        })}
                    </SelectField>
                    {this.state.filters.map((filter, index) => {
                        return (
                            <div
                                className='filter'
                                key={index}
                            >
                                {filter}
                                <CloseIcon
                                    style={{
                                        cursor: 'pointer',
                                        marginTop: 40
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}