import moment from 'moment'
import { BillInputDTO } from '../../model/bill';
import { billDayDifferencePaidDate, billDayDifferenceToday, expiredBillValidator, interesetCalculatorFromGetBills, interesetCalculatorToAddBill } from '../../utils';

describe('utils(unit)', () => {

  describe('billDaysDifference', () => {

    describe('billDayDifferenceToday', () => {

      test('should return seven days of difference', () => {

        const mockDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        const difference = billDayDifferenceToday(mockDate)

        expect(difference).toBe(-7)
      });
    });
    describe('billDayDifferencePaidDate', () => {

      test('should return ten days of difference', () => {

        const mockDueDate = '2021-01-01'
        const mockPaidDate = '2021-01-11'
        const difference = billDayDifferencePaidDate(mockDueDate, mockPaidDate)

        expect(difference).toBe(-10)
      });
    });
  });

  describe('expiredBillValidator', () => {

    test('should return false if the bill if there is days left before expiring', () => {

      const daysDifference = 10
      const isExpired = expiredBillValidator(daysDifference)

      expect(isExpired).toBe(false)
    });

    test('should return true if the bill is already expired', () => {

      const daysDifference = -10
      const isExpired = expiredBillValidator(daysDifference)

      expect(isExpired).toBe(true)
    });
  });

  describe('interesetCalculator', () => {
    describe('interesetCalculatorFromGetBills', () => {
      test('should calculate the correct overdue_days and intereset if the bill is expired', () => {
        const mockBill = [{ name: 'mock bill', original_price: 100, due_date: moment().subtract(7, 'days').format('YYYY-MM-DD') }]

        const billWithIntereset = interesetCalculatorFromGetBills(mockBill)

        expect(billWithIntereset[0].overdue_days).toBe(7)
        expect(billWithIntereset[0].price_with_interest).toBe(107.1)
      });
      test('should calculate the correct overdue_days and intereset if the bill is expired', () => {
        const mockBill = [{ name: 'mock bill', original_price: 100, due_date: moment().add(7, 'days').format('YYYY-MM-DD') }]

        const billWithIntereset = interesetCalculatorFromGetBills(mockBill)

        expect(billWithIntereset[0].overdue_days).toBe(0)
        expect(billWithIntereset[0].price_with_interest).toBe(null)
      });
    });
    describe('interesetCalculatorToAddBill', () => {
      test('should calculate the correct overdue_days and intereset if the bill is expired', () => {
        const mockBill: BillInputDTO = { name: 'mock bill', original_price: 100, due_date: moment().subtract(7, 'days').format('YYYY-MM-DD') }

        const billWithIntereset = interesetCalculatorToAddBill(mockBill)

        expect(billWithIntereset!.overdue_days).toBe(7)
        expect(billWithIntereset!.price_with_interest).toBe(107.1)
      });
      test('should calculate the correct overdue_days and intereset if the bill is expired', () => {
        const mockBill = { name: 'mock bill', original_price: 100, due_date: moment().add(7, 'days').format('YYYY-MM-DD') }

        const billWithIntereset = interesetCalculatorToAddBill(mockBill)

        expect(billWithIntereset!.overdue_days).toBe(0)
        expect(billWithIntereset!.price_with_interest).toBe(null)
      });
    });
  });
});