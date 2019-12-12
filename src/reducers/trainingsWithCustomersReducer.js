import trainingsService from "../services/trainings"

const trainingsWithCustomersReducer = (state=[], action) => {
    switch (action.type){
        case "INIT_TRAININGSWITHCUSTOMERS":
            return action.data
        default: return state    
    }

}

export const getTrainingsWithCustomers = () => {
    return async dispatch => {
        const trainings = await trainingsService.getAllWithCustomerData()
        dispatch({
            type: "INIT_TRAININGSWITHCUSTOMERS",
            data: trainings
        })
    }
}



export default trainingsWithCustomersReducer

