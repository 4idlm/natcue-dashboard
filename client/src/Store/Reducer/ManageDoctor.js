import * as actionTypes from '../Action/Types'

let initialState = {
    data :[],
    doctor:[],
    avilableTime:[],
    corporateSchedules:[]
     
}

export const fetchDoctorListStart=(state,action)=>{
    return {
        ...state
    }
    
}
export const fetchDoctorStart=(state,action)=>{
    return {
        ...state
    }
    
}
 export const fetchDoctorListSuccess=(state,action)=>{
     return {
         ...state,
         data: action.data
     }
 }
 export const fetchDoctorSuccess=(state,action)=>{

    return {
        ...state,
        doctor: action.doctor
    }
}

export const  doctorAppoinment =(state,action)=>{
    return {
        ...state,
        avilableTime: action.t
    }

}
export const getCorporateSchedulesSuccess = (state,action)=>{
    return {
        ...state,
        corporateSchedules: action.schedules
    }}


 const reducer = (state=initialState ,action) =>{
     switch(action.type){
     case actionTypes.FETCH_DOCTORLIST_START:
     return fetchDoctorListStart(state,action)
     case actionTypes.FETCH_DOCTORLIST_SUCCESS:
     return fetchDoctorListSuccess(state,action)
     case actionTypes.FETCH_DOCTOR_START:
     return fetchDoctorStart(state,action)
     case actionTypes.FETCH_DOCTOR_SUCCESS:
     return fetchDoctorSuccess(state,action)
     case actionTypes.FETCH_DOCTOR_AVAILABLE_TIME:
     return doctorAppoinment(state,action)
     case actionTypes.FETCH_DOCTOR_CORPORATE_SCHEDULES:
     return getCorporateSchedulesSuccess(state,action)
     default :
     return state
     }
 }

 export default reducer;