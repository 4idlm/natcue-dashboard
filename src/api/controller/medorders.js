import Medorder from '../model/medorders'
import Appointments from '../model/appointment'

const pharmaList = async (req, res, next) => {
    let aggregateOption = [{
        $project: {
            _id: 0,
            pharmaId: 1,
            pharmaName: 1,
        }
    }
    ]
    try {
        let data = await Medorder.aggregate(aggregateOption)
        // Remove duplicate from an array
        const unique = new Set(data.map(a => JSON.stringify(a)))
        const pharmacyList = Array.from(unique).map(b => JSON.parse(b))
        if (pharmacyList.length >= 1) {
            res.json({
                pharmacyList
            })
        }
    }
    catch (error) {
        //console.log(error)
    }

}

const pharmaReport = async (req, res, next) => {
    let aggregateOption = [
        {
            $match: {
                pharmacyid: req.query.pharmacyid,
                consultdate: {
                    $gte: req.query.fromDate, $lte: req.query.toDate
                },
                status: "1"
            }
        },
        {
            $project: {
                consultdate: 1,
                ismedordered: 1,
                ismedquotsent: 1,
                displayStatus: 1,
                contactperson: 1
            }
        }
    ]
    try {
        let pharmacyReport = await Appointments.aggregate(aggregateOption)
        if (pharmacyReport.length >= 1) {
            res.json({
                pharmacyReport,
                status: true
            })
        } else {
            let pharmacyReport = `No report available between ${req.query.fromDate} - ${req.query.toDate}`
            return res.json({
                pharmacyReport,
                status: false
            })
        }
    }
    catch (error) {
        //console.log(error)
    }
}


export default {
    pharmaList,
    pharmaReport
} 