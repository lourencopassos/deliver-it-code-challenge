import moment from "moment";
import { BillInputDTO, BillUpdateDTO } from "../model/bill"
import { billDayDifferencePaidDate, billDayDifferenceToday } from "./bill-day-difference"
import { expiredBillValidator } from "./expired-bill-validator"
import { priceWithInteresetBetweenThreeAndFive, priceWithInteresetMoreThanFive, priceWithInteresetUpToThree } from "./price-with-interest-calculator";

export const interesetCalculatorFromGetBills = (bills: BillUpdateDTO[]) => {


  let billsArray: any = [];

  bills.map(bill => {


    const { name, original_price, due_date, paid_at, id, overdue_days } = bill

    const daysDifference = billDayDifferenceToday(due_date)
    const isBillExpired = expiredBillValidator(daysDifference)
    const daysDifferencePositive = daysDifference * -1


    if (!isBillExpired) {
      bill.overdue_days = 0
      billsArray.push(bill)
    }

    if (isBillExpired && paid_at) {
      billsArray.push(bill)
    }

    if (daysDifferencePositive <= 3 && !paid_at && isBillExpired) {
      billsArray.push({
        overdue_days: daysDifferencePositive,
        name,
        paid_at: null,
        price_with_interest: priceWithInteresetUpToThree(original_price, daysDifferencePositive),
        original_price: original_price,
        id,
        due_date
      })
    } else if (daysDifferencePositive > 3 && daysDifferencePositive < 5 && !paid_at) {
      billsArray.push({
        overdue_days: daysDifferencePositive,
        name,
        paid_at: null,
        price_with_interest: priceWithInteresetBetweenThreeAndFive(original_price, daysDifferencePositive),
        original_price: original_price,
        id,
        due_date
      })

    } else if (daysDifferencePositive > 5 && !paid_at) {
      billsArray.push({
        overdue_days: daysDifferencePositive,
        name,
        paid_at: null,
        price_with_interest: priceWithInteresetMoreThanFive(original_price, daysDifferencePositive),
        original_price,
        id,
        due_date
      })
    }
  })
  return (billsArray)

}

export const interesetCalculatorToAddBill = (bill: BillInputDTO) => {

  const { name, original_price, due_date, paid_at } = bill

  const momentDate = moment(due_date).format('YYYY-MM-DD')
  let daysDifference;


  paid_at ? (daysDifference = billDayDifferencePaidDate(momentDate, paid_at)) : (daysDifference = billDayDifferenceToday(momentDate))

  const isBillExpired = expiredBillValidator(daysDifference)
  const daysDifferencePositive = daysDifference * -1


  if (!isBillExpired) {
    return bill
  }


  if (daysDifferencePositive <= 3) {
    return {
      overdue_days: daysDifferencePositive,
      name,
      paid_at,
      price_with_interest: priceWithInteresetUpToThree(original_price, daysDifferencePositive),
      original_price,
      due_date
    }
  } else if (daysDifferencePositive > 3 && daysDifferencePositive < 5) {
    return {
      overdue_days: daysDifferencePositive,
      name,
      paid_at,
      price_with_interest: priceWithInteresetBetweenThreeAndFive(original_price, daysDifferencePositive),
      original_price,
      due_date
    }
  } else if (daysDifferencePositive > 5) {
    return {
      overdue_days: daysDifferencePositive,
      name,
      paid_at,
      price_with_interest: priceWithInteresetMoreThanFive(original_price, daysDifferencePositive),
      original_price,
      due_date
    }
  }
}
