import express from 'express'
import notificationControler from '../controller/notification'


const router = express.Router();
 

router.post('/notifications', notificationControler.OneSignal_notifications)


export default router