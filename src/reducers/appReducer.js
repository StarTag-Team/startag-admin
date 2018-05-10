const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case 'TEST':
            console.log('TEST ACTION!');
            return state;
        default:
            return state
    }
}