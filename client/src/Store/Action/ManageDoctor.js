import * as actionTypes from './Types'
import api from 'axios'
import {mernInstance,instance} from '../../axios'

export const fetchDoctorListStart = () => {
    return {type: actionTypes.FETCH_DOCTORLIST_START}
}

export const fetchDoctorListSuccess = (data) => {
    return {type: actionTypes.FETCH_DOCTORLIST_SUCCESS, data}
}
export const fetchDoctorStart = () => {
    return {type: actionTypes.FETCH_DOCTOR_START}
}
export const fetchDoctorSuccess = (doctor) => {
    return {type: actionTypes.FETCH_DOCTOR_SUCCESS, doctor}
}
export const getCorporateSchedulesSuccess = (schedules)=>{
    return {type: actionTypes.FETCH_DOCTOR_CORPORATE_SCHEDULES, schedules}
}
export const getDoctorList = () => async dispatch => {
    dispatch(fetchDoctorListStart());
    try {
        let data = await instance.get('profile/list/dr')
        dispatch(fetchDoctorListSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}


export const DoctorAvailable = (t) => {
    console.log(t)
    return {type: actionTypes.FETCH_DOCTOR_AVAILABLE_TIME,t}
}


export const fetchDoctorAvailableTime = (id,day)  => async dispatch =>{
console.log(id,day)
let timeportal=[];
 
try {
    let data = await instance.get(`appointments/doctortiming?doctorid=${id}&&consultdate=${day}`)
    console.log(data)
    console.log(id)
    timeportal.id=id;
    timeportal.data=data.data;
    console.log(timeportal);
    dispatch(DoctorAvailable(timeportal))
} catch (err) {
    console.log(err)

}
}


export const getDoctor = (id) => async dispatch => {
    dispatch(fetchDoctorStart());
    try {
        let data = await instance.get(`profile/${id}`)
        dispatch(fetchDoctorSuccess(data.data))
    } catch (err) {
        console.log(err)

    }
}
export const updateDoctor = (obj)=> async dispatch =>{

    dispatch(fetchDoctorStart());

    try {
        let data = await instance.put(`profile/${obj.id}`,obj)
         dispatch(fetchDoctorSuccess(data.data.data[0]))
          
    } catch (err) {
        console.log(err)

    }
    
}
export const addDoctor = (obj)=> async dispatch =>{

    try {
        let data = await instance.post(`profile/dr`,obj)
          
    } catch (err) {
        console.log(err)

    }
    
}


 
 
 export const fetchAvilableDate =(output) => async dispatch  =>{
    
     try {
         let data = await instance.post(`appointments/timing`,output)
     console.log(data)

         //dispatch(DoctorAvailableSlots(output))
    
     }
     catch (err) {
         console.log(err)
     
     }
 
 }

 export const getCorporateSchedules = (id) => async dispatch =>{
     try {
         let data = await instance.get(`profile/dr/${id}/corporateschedule`)
         dispatch(getCorporateSchedulesSuccess(data.data));
     } catch (error) {
         
     }
 }
  