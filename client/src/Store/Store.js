import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from '../Store/Reducer/Auth'
import ReportReducer from '../Store/Reducer/Report'
import DoctorListReducer from '../Store/Reducer/ManageDoctor'
import OfficeListReducer from '../Store/Reducer/Office'
import CouponListReducer from '../Store/Reducer/ManageCoupon'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: AuthReducer,
    report: ReportReducer,
    data:DoctorListReducer,
    office:OfficeListReducer,
    coupon:CouponListReducer,


})

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store;

