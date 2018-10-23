import * as actionTypes from './Types'
import { mernInstance, instance } from '../../axios'

export const getOverallReport = () => {
  return {
    type: actionTypes.GET_OVERALL_REPORT
  }
}

export const fetchDoctorsStart = () => {
  return {
    type: actionTypes.FETCHING_DOCTORS_START
  }
}

export const fetchDoctorsSuccess = (_doctorList) => {
  // Remove duplicates from Array of Objects 
  //const unique = new Set(_doctorList.map(a => JSON.stringify(a)))
  //const doctorList = Array.from(unique).map(b => JSON.parse(b))
  return {
    type: actionTypes.FETCHING_DOCTORS_SUCCESS,
    _doctorList
  }
}

export const doctors = () => async dispatch => {
  dispatch(fetchDoctorsStart());
  try {
    const doctorList = await instance.get("profile/list/dr")
    if (doctorList.data.length >= 1) {
      dispatch(fetchDoctorsSuccess(doctorList.data))
    }
  } catch (error) {

  }
}

export const fetchReportStart = () => {
  return {
    type: actionTypes.FETCHING_REPORT_START
  }
}

export const fetchReportSuccess = (report, status, doctorname) => {
  return {
    type: actionTypes.FETCHING_REPORT_SUCCESS,
    report,
    status,
    doctorname,
  }
}

export const report = (doctorname, fromDate, toDate) => async dispatch => {
  dispatch(fetchReportStart());
  try {
    const report = await mernInstance.get(`getappointmentstatus?doctorname=${doctorname}&&fromDate=${fromDate}&&toDate=${toDate}`)
    if (report.data.appointmentStatus) {
      dispatch(fetchReportSuccess(report.data.appointmentStatus, report.data.status, doctorname));
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchPatientListStart = () => {
  return {
    type: actionTypes.FETCHING_PATIENTLIST_START
  }
}

export const fetchPatientListSuccess = (patientList, status) => {
  return {
    type: actionTypes.FETCHING_PATIENTLIST_SUCCESS,
    patientList,
    status
  }
}

export const patientList = (doctorname, fromDate, toDate) => async dispatch => {
  dispatch(fetchDoctorsStart());
  try {
    const _patientList = await mernInstance.get(`getpatientlist?doctorname=${doctorname}&&fromDate=${fromDate}&&toDate=${toDate}`);
    if (_patientList.data.patientList) {
      dispatch(fetchPatientListSuccess(_patientList.data.patientList, _patientList.data.status))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchOverallConsultation = (overallReport, status) => {
  return {
    type: actionTypes.FETCHING_OVERALL_CONSULTATION,
    overallReport,
    status
  }
}

export const overallConsultation = (fromDate, toDate) => async dispatch => {
  try {
    const overallConsultationReport = await mernInstance.get(`overallstatus?fromDate=${fromDate}&&toDate=${toDate}`)
    if (overallConsultationReport.data.overallReport) {
      dispatch(fetchOverallConsultation(overallConsultationReport.data.overallReport, overallConsultationReport.data.status))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchPharmaListStart = () => {
  return {
    type: actionTypes.FETCHING_PHARMALIST_START
  }
}

export const fetchPharmaListSuccess = (pharmacyList) => {
  return {
    type: actionTypes.FETCHING_PHARMALIST_SUCCESS,
    pharmacyList
  }
}

export const pharmaList = () => async dispatch => {
  dispatch(fetchPharmaListStart())
  try {
    const _pharmaList = await mernInstance.get('pharmareport/pharmalist');
    if (_pharmaList.data.pharmacyList.length >= 1) {
      dispatch(fetchPharmaListSuccess(_pharmaList.data.pharmacyList))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchPharmaReportStart = () => {
  return {
    type: actionTypes.FETCH_PHARMAREPORT_START
  }
}

export const fetchPharmaReportSuccess = (pharmacyReport, status) => {
  return {
    type: actionTypes.FETCH_PHARMAREPORT_SUCCESS,
    pharmacyReport,
    status
  }
}

export const pharmaReport = (pharmacyid, fromDate, toDate) => async dispatch => {
  dispatch(fetchPharmaReportStart())
  try {
    const _pharmaReport = await mernInstance.get(`pharmareport/pharmareport?pharmacyid=${pharmacyid}&&fromDate=${fromDate}&&toDate=${toDate}`);
    if (_pharmaReport.data.pharmacyReport.length >= 1) {
      dispatch(fetchPharmaReportSuccess(_pharmaReport.data.pharmacyReport, _pharmaReport.data.status))
    }
  } catch (error) {
    console.log(error)
  }
}


