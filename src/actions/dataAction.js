import actions from '@constants/actions'

class DataActions {
    static putData(data) {
        return {
            type: actions.PUT_RESOURCE_DATA,
            payload: data
        }
    }
}

export default DataActions