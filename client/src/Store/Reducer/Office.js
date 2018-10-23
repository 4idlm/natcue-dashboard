import * as actionTypes from '../Action/Types'

let initialState = {
    data :[],
    office:[],
    officeNames:[],
    doctorNames:[],
    schedules:[],
    schedule:[]
}

export const fetchOfficeListStart=(state,action)=>{
    return {
        ...state
    }
    
}
export const fetchOfficeStart=(state,action)=>{
    return {
        ...state
    }
    
}
 export const fetchOfficeListSuccess=(state,action)=>{
     return {
         ...state,
         data: action.data
     }
 }
 export const fetchOfficeSuccess=(state,action)=>{
    console.log(action)
    return {
        ...state,
        office: action.office
    }
}
export const fetchOfficeNamesSuccess=(state,action)=>{
    console.log(action)
    return {
        ...state,
        officeNames: action.officeNames
    }
}
export const fetchDoctorNamesSuccess=(state,action)=>{
   
    return {
        ...state,
        doctorNames: action.doctorNames
    }
}

export const fetchOfficeScheduleSuccess=(state,action)=>{
    
    return {
        ...state,
        schedules: action.schedules
    }
}
export const fetchSpecificScheduleSuccess=(state,action)=>{
   
    return {
        ...state,
        schedule: action.schedule
    }
}
 const reducer = (state=initialState ,action) =>{
     switch(action.type){
     case actionTypes.FETCH_OFFICELIST_START:
     return fetchOfficeListStart(state,action)
     case actionTypes.FETCH_OFFICELIST_SUCCESS:
     return fetchOfficeListSuccess(state,action)
     case actionTypes.FETCH_OFFICE_START:
     return fetchOfficeStart(state,action)
     case actionTypes.FETCH_OFFICE_SUCCESS:
     return fetchOfficeSuccess(state,action)
     case actionTypes.FETCH_OFFICENAMES_SUCCESS:
     return fetchOfficeNamesSuccess(state,action)
     case actionTypes.FETCH_DOCTORNAMES_SUCCESS:
     return fetchDoctorNamesSuccess(state,action)
     case actionTypes.FETCH_OFFICESHEDULES_SUCCESS:
     return fetchOfficeScheduleSuccess(state,action)
     case actionTypes.FETCH_SPECIFIC_SCHEDULE_SUCCESS:
     return fetchSpecificScheduleSuccess(state,action)
     default :
     return state
     }
 }

 export default reducer;