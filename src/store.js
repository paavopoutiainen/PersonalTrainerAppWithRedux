import { createStore, combineReducers, applyMiddleware } from "redux"
import customerReducer from "./reducers/customerReducer"
import trainingsReducer from "./reducers/trainingsReducer"
import customersTrainingsReducer from "./reducers/customersTrainingsReducer"
import trainingsWithCustomersReducer from "./reducers/trainingsWithCustomersReducer"
import notificationReducer from "./reducers/notificationReducer"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
    customers: customerReducer,
    trainings: trainingsReducer,
    customersTrainings: customersTrainingsReducer,
    trainingsWithCustomers: trainingsWithCustomersReducer,
    notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
  ))

  export default store