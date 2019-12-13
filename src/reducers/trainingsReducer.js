import trainingsService from "../services/trainings"

const trainingsReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_TRAININGS":
            return action.data
        case "ADD_TRAINING":
            return state.concat(action.addedTraining)
        case "DELETE_TRAINING":
            //const idOfTheRemoved = action.data.substring(44)
            console.log(action.id)
            return state.filter(t => t.links[1].href.substring(49).indexOf(action.id) === -1)
        default: return state    
    }

}

export const getTrainings = () => {
    return async (dispatch) => {
        const trainings= await trainingsService.getAll()
        dispatch({
            type: "INIT_TRAININGS",
            data: trainings
        })
    }
}
export const addTrainingActionCreator = (newTraining) => {
    return async dispatch => {
        const addedTraining = await trainingsService.create(newTraining)
        dispatch({
            type: "ADD_TRAINING",
            addedTraining
        })
    }
}


export const deleteTraining = (link) => {
    return async dispatch => {
        const response = await trainingsService.deleteTraining(link)
        const id = response.config.url.replace(/[/]/g, "").substring(44)
        dispatch({
            type: "DELETE_TRAINING",
            id
        })
    }
}

export default trainingsReducer