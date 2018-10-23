import *  as actionTypes from './Types';
import {mernInstance,instance} from '../../axios'
 
export const  addingNotificationListStart= ()=>{

return{type: actionTypes.ADDING_NOTIFICATIONLIST_START }


}




export const  addingNotificationListSucess= (output)=>{

    return{type: actionTypes.ADDING_NOTIFICATIONLIST_SUCCESS ,output}
    
    
    }
 

export const addNotification =  (output)  => async dispatch => {
    dispatch(addingNotificationListStart());
    try {

        let data = await mernInstance.post('notifications', output)
        console.log(data, 'notificationpost')

        dispatch(addingNotificationListSucess(output))
    }
    catch (err) {
        console.log(err)

    }

}