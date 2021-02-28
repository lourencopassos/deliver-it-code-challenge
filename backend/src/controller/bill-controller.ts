import { Request, Response } from "express";
import { BillBusiness } from "../business/bill-business";
import { BillDatabase } from "../data/bill-database";


export class BillController {
  async addBill(req: Request, res: Response) {
    try {

      const { name, original_price, due_date, paid_at, price_with_intereset, overdue_days } = req.body

      const bill = { name, original_price, due_date, paid_at, price_with_intereset, overdue_days }



      const billDatabase = new BillDatabase();
      const billBusiness = new BillBusiness(billDatabase);

      await billBusiness.addBill(bill)
      res.status(201).send()
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getBills(req: Request, res: Response) {
    try {

      const billDatabase = new BillDatabase();
      const billBusiness = new BillBusiness(billDatabase);

      const bills = await billBusiness.getBills()

      res.status(200).send(bills);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

}