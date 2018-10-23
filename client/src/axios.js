import axios from 'axios'

const mernInstance = axios.create({
    baseURL: 'http://localhost:5000/'
    
  //  baseURL: "http://admin.natcue.com/api"
})

const instance = axios.create({
    baseURL: 'http://devapi.natcue.com/' 
})
const localInstance = axios.create({
    baseURL: 'http://localhost:4000/' 
})
export {
    mernInstance,
    instance,localInstance
}