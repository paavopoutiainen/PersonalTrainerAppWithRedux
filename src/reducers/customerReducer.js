import customerService from "../services/customers"

const customerReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_CUSTOMERS":
            return action.data
        case "ADD_CUSTOMER":
            return state.concat(action.data)
        case "EDIT_CUSTOMER":
            //const uniqueLink = action.data.links[1].href
            const editedCustomer = action.data
            return state.filter(c => !c.links[1].href.match(action.link)).concat(editedCustomer)
        case "DELETE_CUSTOMER":
            return state.filter(c => !c.links[1].href.match(action.link))
        default: return state    
    }

}

export const initializeCustomers = () => {
    return async (dispatch) => {
        const customers = await customerService.getAll()
        dispatch({
            type: "INIT_CUSTOMERS",
            data: customers
        })
    }
}

export const addCustomerActionCreator = (customer) => {
    return async (dispatch) => {
        const newCustomer = await customerService.create(customer)
        dispatch({
            type: "ADD_CUSTOMER",
            data: newCustomer
        })
    }
    
}

export const editCustomerActionCreator = (customer, link) => {
    return async (dispatch) => {
        const editedCustomer = await customerService.update(customer, link)
        dispatch({
            type: "EDIT_CUSTOMER",
            data: editedCustomer,
            link
        })
    }
    
}
export const deleteCustomerActionCreator = (link) => {
    return async (dispatch) => {
        await customerService.deleteCustomer(link)
        dispatch({
            type: "DELETE_CUSTOMER",
            link
        })
    }
    
}


export default customerReducer