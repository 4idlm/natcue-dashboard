import * as actionTypes from './Types'
import api from 'axios'
import { mernInstance, instance } from '../../axios'


export const fetchCouponListStart = () => {

    return { type: actionTypes.FETCH_COUPONLIST_START }

}

export const fetchCouponListSucess = (coupons) => {
    console.log('actiont', coupons)
    return { type: actionTypes.FETCH_COUPONLIST_SUCCESS, coupons }

}

export const addingCouponListStart = () => {

    return { type: actionTypes.ADDING_COUPONLIST_START }

}

export const addingCouponListSucess = (output) => {
    console.log(output, 'adding the datas')
    return { type: actionTypes.ADDING_COUPONLIST_SUCCESS, output }
}




export const getCoupon = () => async dispatch => {
    dispatch(fetchCouponListStart());
    try {
        let data = await instance.get('coupon/list')
        console.log(data, 'getapi')
        console.log(data.data, 'getapi123456')
        dispatch(fetchCouponListSucess(data.data))
    } catch (err) {
        console.log(err)

    }
}


export const addCoupon = (output) => async dispatch => {
    dispatch(addingCouponListStart());
    try {

        let data = await instance.post('coupon/', output)
        console.log(data, 'postapi')

        dispatch(addingCouponListSucess(output))
    }
    catch (err) {
        console.log(err)

    }

}

export const updateCoupon = (obj) => async dispatch => {

    try {

        let data = await api.put(`http://devapi.natcue.com/coupon/${obj.id}`, obj)
        console.log(data, 'postapi')

    }
    catch (err) {
        console.log(err)

    }

}
