const initialState = {}


export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'PUT_RESOURCE_DATA':
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}