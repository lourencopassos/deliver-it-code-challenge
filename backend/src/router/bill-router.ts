import express from 'express'
import { BillBusiness } from '../business/bill-business'
import { BillController } from '../controller/bill-controller'
import { BillDatabase } from '../data/bill-database'

export const billRouter = express.Router()

const controller = new BillController()

billRouter.post('/', controller.addBill)
billRouter.get('/', controller.getBills)