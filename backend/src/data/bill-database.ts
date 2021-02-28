import { BillModel, BillInputDTO, BillUpdateDTO } from "../model/bill";
import { BaseDatabase } from "./base-database";

export class BillDatabase extends BaseDatabase {

  addBill = async (name: string, original_price: number, due_date: Date, paid_at?: Date, price_with_interest?: number, overdue_days?: number) => {
    try {
      await this.getConnection()
      await new BillModel({
        name, original_price, due_date, paid_at, price_with_interest, overdue_days
      }).save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getBills = async () => {
    try {
      await this.getConnection()
      return await BillModel.find({}).exec()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  updateBill = async (id: string, billToUpdate: BillUpdateDTO) => {
    try {
      await this.getConnection()
      return await BillModel.findByIdAndUpdate(id, billToUpdate)
    } catch (error) {
      throw new Error(error.message)
    }
  }

}