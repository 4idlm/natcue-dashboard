import { Schema } from 'mongoose'
import { RecordStore } from '../../db'

const recordsSchema = new Schema({
    appointmentid: String,
    createdAt: Date,
    sortDate: Number,
    type: String,
    data: Object,
    image: String,
    text: String,
    user: Object,
    objectId: String
})

const Records = RecordStore.model('Records', recordsSchema) 

export default Records