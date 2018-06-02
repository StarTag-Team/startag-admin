const initialState = {
    page: 1
}


export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'PUT_RESOURCE_DATA':
            return {
                ...state,
                ...payload
            }
        case 'GO_PAGE':
            return {
                ...state,
                page: payload
            }
        default:
            return state
    }
}