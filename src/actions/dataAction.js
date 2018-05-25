import actions from '@constants/actions'

class DataActions {
    static putData(data) {
        return {
            type: actions.PUT_RESOURCE_DATA,
            payload: data
        }
    }
    static goPage(page) {
        return {
            type: actions.GO_PAGE,
            payload: page
        }
    }
}

export default DataActions