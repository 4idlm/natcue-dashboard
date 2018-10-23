import {Schema} from 'mongoose'
import { MedOrderStore } from '../../db' 

const medorderSchema = new Schema({
    appointmentid: String,
    orderId: String,
    amount: Number,
    discountAmount: Number,
    discountPercent: Number,
    doctorid: String,
    doctorname: String,
    patientid: String,
    patientname: String,
    deliveryAddress: Object,
    pharmaId: String,
    pharmaName: String,
    pharmaAddress: Object,
    pharmaContact: String,
    createdAt: Date,
    updatedAt: Date,
    orderAt: Date,
    packedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
    returnAt: Date,
    cancelAt: Date,
    isOrdered: Boolean,
    isDelivered: Boolean,
    isPacked: Boolean,
    isShipped: Boolean,
    isReturned: Boolean,
    isCancelled: Boolean,
    returnComment: String,
    status: String,
    trackno: String,
    shippingmode: String,
    treatmentid: String,
    diseaseid: String,
    purpose: String,
    treatment: String,
    displayStatus: String,
    weightInGrams: Number,
    shippingCost: Number,
    isCorporate: Boolean,
})

const MedOrders = MedOrderStore.model('MedOrders', medorderSchema, 'medorders')

export default MedOrders