import * as actionTypes from '../Action/Types'

let initialState = {
  
    coupons:[],
    newcoupon:[]
    
}

export const fetchCouponListStart=(state,action)=>{
    return {
        ...state
    }
    
}

export const fetchCouponListSucess=(state,action)=>{
    console.log(action)
    return {
        ...state,
        coupons:action.coupons
    }
    
}


export const addingCouponListStart=(state,action)=>{
    return {
        ...state
    }
    
}

export const addingCouponListSucess=(state,action)=>{
    console.log(action)
    return {
        ...state,
        newcoupon:action.coupons
    }
    
}

const reducer = (state=initialState ,action) =>{
    switch(action.type){
    case actionTypes.FETCH_COUPONLIST_START:
    return fetchCouponListStart(state,action)
    case actionTypes.FETCH_COUPONLIST_SUCCESS:
    return fetchCouponListSucess(state,action)
    case actionTypes.ADDING_COUPONLIST_START:
    return addingCouponListStart(state,action)
    case actionTypes.ADDING_COUPONLIST_SUCCESS:
    return addingCouponListSucess(state,action)
    default :
    return state
    }
}

export default reducer;
