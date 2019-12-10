import axios from "axios"
import moment from 'moment'

const baseUrl = "https://customerrest.herokuapp.com/api/trainings"
const baseUrlForTrainigsWithCustomer = "https://customerrest.herokuapp.com/gettrainings"

const getAll = async () => {
    try{
        const response = await axios.get(baseUrl)
        const trainings = response.data.content
        
        const formattedDatesTrainings = trainings.map(t => {
          var date = moment(t.date)
          return {...t, date: date.format("LLLL")} 
        })
        return formattedDatesTrainings
    } catch(exception) {
        console.error(exception)
    }
}

const create = async (training) => {
    try{
      await axios.post(baseUrl, training)
    } catch (exception){
      console.error(exception)
    }
}

const deleteTraining = async (link) => {
    try{
        const response = await axios.delete(link)
        return response
    }catch(exception){
        console.error(exception)
    }
}

const getAllWithCustomerData = async () => {
    try{
        const response = await axios.get(baseUrlForTrainigsWithCustomer)
        const trainingsArray = response.data.map(t => {
            const date = moment(t.date)
            const customer = t.customer !== null ? `${t.customer.firstname} ${t.customer.lastname}`: null
            return { ...t, customer: customer, date: date.format("LLLL")}
        })
        return trainingsArray
      }catch(exception){
        console.error(exception)
      }
}

const getTrainingsByCustomer = async () => {
    try{
        const response = await axios.get(baseUrlForTrainigsWithCustomer)
        const data = response.data
        const filtered = data.content.filter(t => t.date !== undefined)
        const content = filtered.map(t => {
            var date =  moment(t.date)
            return {...t, date: date.format("LLLL") } 
        })
        return content
      }catch(exception){
        console.error(exception)
      }
}

export default { getAll, create, deleteTraining, getAllWithCustomerData, getTrainingsByCustomer }