import actions from '@constants/actions'

class DataActions {
    static putData(data) {
        return {
            type: actions.PUT_RESOURCE_DATA,
            payload: data
        }
    }
    static goNextPage(page) {
        return {
            type: actions.GO_NEXT_PAGE,
            payload: page
        }
    }
}

export default DataActions