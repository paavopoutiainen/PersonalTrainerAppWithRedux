import axios from "axios"

const baseUrl = "https://customerrest.herokuapp.com/api/customers"

const getAll = async () => {
    try{
        const response = await axios.get(baseUrl)
        console.log("service", response)
        return response.data.content
    } catch(exception) {
        
      
    }
}

const create = async (customer) => {
    try{
        const response = await axios.post(baseUrl, customer)
        console.log(response)
        return response.data
    } catch(exception) {
        console.error(exception)
    }
}

const update = async (editedCustomer, link) => {
    try{
      const response = await axios.put(link, editedCustomer)
      console.log(response)
    } catch(exception) {
      console.error(exception)
    }
}

const deleteCustomer = async (link) => {
    try{
      const response = await axios.delete(link)
      console.log(response)
    } catch(exception) {
      console.error(exception)
    }
    
}



export default { getAll, create, update, deleteCustomer }
