import mongoose from 'mongoose'
import config from '../config'

const AppointmentStore = mongoose.createConnection(config.MONGO_URI_APPOINTMENTS, () => {
    console.log(`appointmentstore is connected`)
})

const MedOrderStore = mongoose.createConnection(config.MONGO_URI_MEDORDERS, () => {
    console.log(`medorderstore is connected`)
})

const RecordStore = mongoose.createConnection(config.MONGO_URI_RECORDS, () => {
    console.log(`recordstore is connected`)
})
export {
    AppointmentStore,
    MedOrderStore,
    RecordStore
}