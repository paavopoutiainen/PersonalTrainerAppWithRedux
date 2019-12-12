

const notificationReducer = (state = {notification: "", open: false}, action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION":
            return {...state, notification: action.notification, open: !state.open}
        case "EMPTY_NOTIFICATION":
            return {...state, notification: "", open: !state.open}
        default: return state    
    }

}

export const newNotificationActionCreator = (notification) => {
    return dispatch => {
        dispatch({
            type: "NEW_NOTIFICATION",
            notification
        })
    }
}

export const emptyNotificationActionCreator = () => {
    return dispatch => {
        dispatch({
        type: "EMPTY_NOTIFICATION"
        })
    }
}

export default notificationReducer