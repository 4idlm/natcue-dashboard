import express from 'express'
import medorderController from '../controller/medorders'

const router = express.Router();

router.get('/pharmalist', medorderController.pharmaList)
router.get('/pharmareport', medorderController.pharmaReport)

export default router