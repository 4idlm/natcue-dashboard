export {
    auth,
    authSuccess,
    authStart,
    authFail,
    setAuthRedirectPath,
    authCheckState,
    logout
} from './Auth'

export {
    doctors,
    report,
    getOverallReport,
    overallConsultation,
    patientList,
    pharmaList,
    pharmaReport
} from './Report'
export {
    getDoctorList,getDoctor,updateDoctor,addDoctor, fetchDoctorAvailableTime,fetchAvilableDate,
    getCorporateSchedules
} from './ManageDoctor'

export {
    getOfficeList ,getOffice,addOffice,updateOffice,getOfficeNames,getDoctorNames,
    addSchedule,getSchedules,getSchedule,updateSchedule,cancelSchedule
} from './Office'

export {
    getCoupon,addCoupon,updateCoupon
}
from './ManageCoupon'

export {

    addNotification 
}
from './Notification'