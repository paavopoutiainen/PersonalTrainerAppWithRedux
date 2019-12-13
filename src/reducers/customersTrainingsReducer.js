import trainingsService from "../services/trainings"


const customersTrainingsReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_CUSTOMERTRAININGS":
            return action.trainings
        default: return state
    }
}

export const getTrainingsForCustomer = (link) => {
    return async (dispatch) => {
        const trainings = await trainingsService.getTrainingsByCustomer(link)
        dispatch({
            type: "GET_CUSTOMERTRAININGS",
            trainings
        })
    }
}

export default customersTrainingsReducer