import trainingsService from "../services/trainings"

const trainingsReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_TRAININGS":
            return action.data
        case "ADD_TRAINING":
            return state.concat(action.addedTraining)
        case "DELETE_TRAINING":
            const idOfTheRemoved = action.data.substring(44)
            return state.filter(t => t.links[1].href.substring(49).indexOf(idOfTheRemoved))
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
        console.log("added training", addedTraining)
        dispatch({
            type: "ADD_TRAINING",
            addedTraining
        })
    }
}


export const deleteTraining = (link) => {
    return async dispatch => {
        const response = await trainingsService.deleteTraining(link)
      
        const url = response.config.url.replace(/[/]/g, "")
        dispatch({
            type: "DELETE_TRAINING",
            data: url
        })
    }
}

export default trainingsReducer