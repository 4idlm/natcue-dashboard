import Appointments from '../model/appointment'
import Records from '../model/records'
import moment from 'moment'

const get_appointment_status = async (req, res, next) => {
    try {
        let match;

        if (req.query.doctorname, req.query.fromDate && req.query.toDate != "null") {
            match = {
                doctorname: req.query.doctorname,
                consultdate: { $gte: req.query.fromDate, $lte: req.query.toDate }
            }
        } else if (req.query.doctorname, req.query.fromDate && req.query.toDate === "null") {
            match = {
                doctorname: req.query.doctorname
            }
        }

        const aggregationOption = [
            {
                $match: match
            }, {
                $project: {
                    status: 1,
                    isattachreport: 1,
                    displayStatus: 1,
                }
            }
        ]
        const appointmentStatus = await Appointments.aggregate(aggregationOption);

        if (appointmentStatus.length >= 1) {
            return res.json({
                appointmentStatus,
                status: true
            })
        } else {
            let appointmentStatus = `No consultations available between ${req.query.fromDate} - ${req.query.toDate}`
            return res.json({
                appointmentStatus,
                status: false
            })
        }
    } catch (error) {
        //console.log(error)
        res.json({
            error
        })
    }
}

const get_patientList = async (req, res, next) => {

    try {
        let match = {
            doctorname: req.query.doctorname,
            consultdate: { $gte: req.query.fromDate, $lte: req.query.toDate }
        }

        let aggregationOption = [
            {
                $match: match
            }, {
                $project: {
                    _id: 0,
                    appointmentid: 1,
                    contactperson: 1,
                    createddate: 1
                }
            }
        ]

        const appointments = await Appointments.aggregate(aggregationOption);

        const records = await Records.find({
            type: {
                $in: ["CONSULTATION_BOOK", "CONSULTATION_COMPLETED", "CONSULTATION_DID_NOT_PICK", "CONSULTATION_CANCEL", "CONSULTATION_CANCEL_DR", "CONSULTATION_NOT_RECOMMENDED"]
            }
        }).select("appointmentid type createdAt")

        let patientList = []

        records.forEach(record => {
            appointments.forEach(appointment => {
                if (appointment.appointmentid === record.appointmentid) {
                    patientList = patientList.filter(data => {
                        return data.appointmentid !== record.appointmentid
                    })
                    patientList.push({
                        appointmentid: record.appointmentid,
                        name: appointment.contactperson.name,
                        phone: appointment.contactperson.phone,
                        booked: moment(appointment.createddate).format('DD/MM/YYYY hh:mm a'),
                        completed: record.type === "CONSULTATION_COMPLETED" ? moment(record.createdAt).format('DD/MM/YYYY hh:mm a') : null,
                        notPickup: record.type === "CONSULTATION_DID_NOT_PICK" ? moment(record.createdAt).format('DD/MM/YYYY hh:mm a') : null,
                        cancelledDR: record.type === "CONSULTATION_CANCEL_DR" ? moment(record.createdAt).format('DD/MM/YYYY hh:mm a') : null,
                        cancelledUser: record.type === "CONSULTATION_CANCEL" ? moment(record.createdAt).format('DD/MM/YYYY hh:mm a') : null,
                        notRecommended: record.type === "CONSULTATION_NOT_RECOMMENDED" ? moment(record.createdAt).format('DD/MM/YYYY hh:mm a') : null
                    })
                }
            })
        })

        if (patientList.length >= 1) {
            return res.json({
                patientList,
                status: true
            })
        } else {
            let patientList = [];
            return res.json({
                patientList,
                status: false
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }
}

const overAllConsultation = async (req, res, next) => {
    try {
        let match = {
            consultdate: { $gte: req.query.fromDate, $lte: req.query.toDate }
        } 

        let aggregationOption = [
            {
                $match: match
            }, {
                $project: {
                    _id: 0,
                    appointmentid: 1,
                    doctorname: 1,
                    treatment: 1,
                    contactperson: 1,
                    purpose: 1,
                    timeid: 1,
                    createddate: 1,
                    status: 1,
                    resolvedAt: 1,
                    displayStatus: 1
                }
            }
        ]

        const overallReportData = await Appointments.aggregate(aggregationOption);

        let overallReport = [];
        overallReportData.map((report, index) => {
            overallReport.push({
                key: report.appointmentid,
                doctorName: report.doctorname,
                treatment: report.treatment,
                userName: report.contactperson.name,
                phone: report.contactperson.phone,
                purpose: report.purpose,
                displayStatus: report.displayStatus,
                booked: moment(report.createddate).format('DD/MM/YYYY hh:mm a'),
                appointment: moment(report.timeid,"YYYYMMDDHHmm") .format('DD/MM/YYYY hh:mm a')
            })

            if (report.status === "1") {
                overallReport[index].completed = moment(report.resolvedAt).format('DD/MM/YYYY hh:mm a')
            } else {
                overallReport[index].completed = null
            }

            if (report.status = "2") {
                switch (report.displayStatus) {
                    case "CONSULTATION_DID_NOT_PICK":
                        overallReport[index].notPickedUp = moment(report.resolvedAt).format('DD/MM/YYYY hh:mm a')
                        overallReport[index].cancelledDR = null
                        overallReport[index].cancelled = null
                        overallReport[index].notRecommended = null
                        break

                    case "CONSULTATION_CANCEL_DR":
                        overallReport[index].cancelledDR = moment(report.resolvedAt).format('DD/MM/YYYY hh:mm a')
                        overallReport[index].notPickedUp = null
                        overallReport[index].cancelled = null
                        overallReport[index].notRecommended = null
                        break

                    case "CONSULTATION_CANCEL":
                        overallReport[index].cancelled = moment(report.resolvedAt).format('DD/MM/YYYY hh:mm a')
                        overallReport[index].notPickedUp = null
                        overallReport[index].cancelledDR = null
                        overallReport[index].notRecommended = null
                        break
                    case "CONSULTATION_NOT_RECOMMENDED":
                        overallReport[index].notRecommended = moment(report.resolvedAt).format('DD/MM/YYYY hh:mm a')
                        overallReport[index].notPickedUp = null
                        overallReport[index].cancelledDR = null
                        overallReport[index].cancelled = null
                        break
                    default:
                        overallReport[index].notRecommended = null
                        overallReport[index].notPickedUp = null
                        overallReport[index].cancelledDR = null
                        overallReport[index].cancelled = null
                }
            }
        })

        if (overallReport.length >= 1) {
            return res.json({
                overallReport,
                status: true
            })
        } else {
            let overallReport = []
            return res.json({
                overallReport,
                status: false
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }
}

export default {
    get_appointment_status,
    get_patientList,
    overAllConsultation
}
