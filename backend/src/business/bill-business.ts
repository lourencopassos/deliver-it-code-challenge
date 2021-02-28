import { BillDatabase } from "../data/bill-database";
import { MissingParameterError } from "../error";
import { InvalidParameterError } from "../error/invalid-parameter.error";
import { BillInputDTO, BillUpdateDTO } from "../model/bill";
import { interesetCalculatorFromGetBills, interesetCalculatorToAddBill } from "../utils/interest-calculator";
import { BillSchema } from '../model/bill'

export class BillBusiness {
  billDatabase: BillDatabase;
  constructor(billDatabase: BillDatabase) {
    this.billDatabase = billDatabase;
  }

  async addBill(bill: any) {



    const requiredFields = ['name', 'original_price', 'due_date']

    for (const field of requiredFields) {
      if (!bill[field]) {
        throw new MissingParameterError(field)
      }
    }

    const billWithIntereset = interesetCalculatorToAddBill(bill)

    const { name, original_price, due_date, paid_at, price_with_interest, overdue_days } = billWithIntereset as any

    return await this.billDatabase.addBill(name, original_price, due_date, paid_at, price_with_interest, overdue_days)
  }

  async getBills() {

    const bills = await this.billDatabase.getBills()

    const billsWithUpdatedIntereset = interesetCalculatorFromGetBills(bills as unknown as BillUpdateDTO[])

    for (let index = 0; index < bills.length; index++) {
      const bill = bills[index] as unknown as BillUpdateDTO
      const id = bills[index].id;

      await this.billDatabase.updateBill(id, bill)
    }

    return billsWithUpdatedIntereset
  }
}
