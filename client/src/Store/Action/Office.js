import * as actionTypes from './Types'
import {instance,localInstance} from '../../axios'


export const fetchOfficeListStart = () => {
    return {type: actionTypes.FETCH_OFFICELIST_START}
}

export const fetchOfficeListSuccess = (data) => {
    return {type: actionTypes.FETCH_OFFICELIST_SUCCESS, data}
}
export const fetchOfficeStart = () => {
    return {type: actionTypes.FETCH_OFFICE_START}
}
export const fetchOfficeNamesSuccess = (officeNames) => {
   
    return {type: actionTypes.FETCH_OFFICENAMES_SUCCESS, officeNames}
}
export const fetchDoctorNamesSuccess = (doctorNames) => {
 
    return {type: actionTypes.FETCH_DOCTORNAMES_SUCCESS, doctorNames}
}
export const fetchOfficeSuccess = (office) => {
    
    return {type: actionTypes.FETCH_OFFICE_SUCCESS, office}
}
export const fetchOfficeSchedulesSuccess = (schedules) => {
    
    return {type: actionTypes.FETCH_OFFICESHEDULES_SUCCESS, schedules}
}
export const fetchSpecificScheduleSuccess = (schedule) => {
   
    return {type: actionTypes.FETCH_SPECIFIC_SCHEDULE_SUCCESS, schedule}
}
export const getOfficeList = () => async dispatch => {
    dispatch(fetchOfficeListStart());
    try {
        let data = await instance.get(`profile/list/office`)
        dispatch(fetchOfficeListSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}



export const getOffice = (id) => async dispatch => {
    dispatch(fetchOfficeStart());
    try {
        let data = await instance.get(`profile/office/id/?id=${id}`)
        dispatch(fetchOfficeSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}
export const updateOffice = (obj)=> async dispatch =>{

    dispatch(fetchOfficeStart());

    try {
        let data = await instance.put(`profile/office/id/?id=${obj.id}`,obj)
         dispatch(fetchOfficeSuccess(data.data.data))
          
    } catch (err) {
        console.log(err)

    }
    
}
export const addOffice = (obj)=> async dispatch =>{

    try {
        let data = await instance.post(`profile/office`,obj)
          
    } catch (err) {
        console.log(err)

    }
    
}
export const getOfficeNames = () => async dispatch => {
    try {
        let data = await instance.get(`profile/list/office`)
        dispatch(fetchOfficeNamesSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}
export const getDoctorNames = () => async dispatch => {
    try {
        let data = await instance.get(`profile/list/dr`)
        dispatch(fetchDoctorNamesSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}
export const addSchedule = (obj) => async dispatch => {
    try {
        let data = await instance.post(`profile/office/schedule`,obj)
   
    } catch (err) {
        console.log(err)

    }
}
export const getSchedules = () => async dispatch => {
    try {
        let data = await instance.get(`profile/office/schedules`)
         dispatch(fetchOfficeSchedulesSuccess(data.data.data))
    } catch (err) {
        console.log(err)

    }
}
export const getSchedule = (id) => async dispatch => {
    try {
        let data = await instance.get(`profile/schedule/id?id=${id}`)
         dispatch(fetchSpecificScheduleSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}
export const updateSchedule = (obj)=> async dispatch =>{


    try {
        let data = await instance.put(`profile/schedule/id?id=${obj.id}`,obj)
        
        dispatch(fetchSpecificScheduleSuccess(data.data))
          
    } catch (err) {
        console.log(err)

    }
    
}
export const cancelSchedule = (obj)=> async dispatch =>{


    try {
        let data = await instance.put(`profile/schedule/cancel/id?id=${obj}`)
        
        dispatch(fetchSpecificScheduleSuccess(data.data))
          
    } catch (err) {
        console.log(err)

    }
    
}