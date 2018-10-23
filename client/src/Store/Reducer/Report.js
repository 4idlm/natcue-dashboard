import * as actionTypes from '../Action/Types'
import { updateObject } from '../../shared/Utility'

const initialState = {
    doctorList: [],
    consultationReport: [],
    consultationReportStatus: null,
    patientListStatus: null,
    overallReport: [],
    overAllReportStatus: null,
    pharmacyList: [],
    pharmacyReport: [],
    pharmacyReportStatus: null,
    loading: true,
    doctorname: null,
    pharmacyid: null,
    consultdate: null
}

export const getOverallReport = (state, action) => {
    return updateObject(state, {
        reportStatus: false
    })
}

export const fetchDoctorsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

export const fetchDoctorsSuccess = (state, action) => {
    return updateObject(state, {
        doctorList: action._doctorList,
        loading: false
    })
}

export const fetchReportStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    })
}

export const fetchReportSuccess = (state, action) => {
    return updateObject(state, {
        consultationReport: action.report,
        consultationReportStatus: action.status,
        loading: false,
        doctorname: action.doctorname,
        consultdate: action.consultdate
    })
}

export const fetchPatientListStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

export const fetchPatientListSuccess = (state, action) => {
    return updateObject(state, {
        patientList: action.patientList,
        patientListStatus: action.status,
        loading: false
    })
}

export const fetchOverallConsultation = (state, action) => {
    return updateObject(state, {
        overallReport: action.overallReport,
        overAllReportStatus: action.status,

    })
}

export const fetchPharmaListStart = (state, action) => {
    return updateObject(state, {
        loading: true,

    })
}

export const fetchPharmaListSuccess = (state, action) => { 
    return updateObject(state, {
        pharmacyList: action.pharmacyList,
        pharmacyid: action.pharmacyList[0].pharmaId,
        loading: false
    })
}

export const fetchPharmaReportStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

export const fetchPharmaReportSuccess = (state, action) => {
    return updateObject(state, {
        pharmacyReport: action.pharmacyReport,
        pharmacyReportStatus: action.status,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCHING_DOCTORS_START:
            return fetchDoctorsStart(state, action)
        case actionTypes.FETCHING_DOCTORS_SUCCESS:
            return fetchDoctorsSuccess(state, action)
        case actionTypes.FETCHING_REPORT_START:
            return fetchReportStart(state, action)
        case actionTypes.FETCHING_REPORT_SUCCESS:
            return fetchReportSuccess(state, action)
        case actionTypes.GET_OVERALL_REPORT:
            return getOverallReport(state, action)
        case actionTypes.FETCHING_PATIENTLIST_START:
            return fetchPatientListStart(state, action)
        case actionTypes.FETCHING_PATIENTLIST_SUCCESS:
            return fetchPatientListSuccess(state, action)
        case actionTypes.FETCHING_OVERALL_CONSULTATION:
            return fetchOverallConsultation(state, action)
        case actionTypes.FETCHING_PHARMALIST_START:
            return fetchPharmaListStart(state, action)
        case actionTypes.FETCHING_PHARMALIST_SUCCESS:
            return fetchPharmaListSuccess(state, action)
        case actionTypes.FETCH_PHARMAREPORT_START:
            return fetchPharmaReportStart(state, action)
        case actionTypes.FETCH_PHARMAREPORT_SUCCESS:
            return fetchPharmaReportSuccess(state, action)
        default:
            return state
    }
}

export default reducer;