import express from 'express'
import appointmentController from '../controller/appointment'

const router = express.Router()

router.get('/getappointmentstatus', appointmentController.get_appointment_status)
router.get('/getpatientlist', appointmentController.get_patientList)
router.get('/overallstatus', appointmentController.overAllConsultation)

export default router