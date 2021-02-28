import nock from 'nock'
import { BillBusiness } from '../../business/bill-business';
import { BillDatabase } from '../../data/bill-database';

const makeBillBusiness = () => {
  const billDatabase = new BillDatabase()
  return new BillBusiness(billDatabase)
}

describe('billBusiness (unit)', () => {
  describe('addBill', () => {
    test('should throw a missing parameter error if there is no name provided', async () => {

      try {
        const bodyRequest = {
          original_price: 100, due_date: '03/01/2021'
        }

        nock('http://localhost:3000/api/v1/bills')
          .post('/', bodyRequest)
          .replyWithError('Missing param: name')

        const billBusiness = makeBillBusiness()
        const addBillRequest = await billBusiness.addBill(bodyRequest)
      } catch (error) {
        expect(error.message).toBe('Missing param: name')
      }
    });
    test('should throw a missing parameter error if there is no due_date provided', async () => {

      try {
        const bodyRequest = {
          original_price: 100, name: 'bill_name'
        }

        nock('http://localhost:3000/api/v1/bills')
          .post('/', bodyRequest)
          .replyWithError('Missing param: due_date')

        const billBusiness = makeBillBusiness()
        const addBillRequest = await billBusiness.addBill(bodyRequest)
      } catch (error) {
        expect(error.message).toBe('Missing param: due_date')
      }
    });
    test('should throw a missing parameter error if there is no original_price provided', async () => {

      try {
        const bodyRequest = {
          due_date: '03/01/2021', name: 'bill_name'
        }

        nock('http://localhost:3000/api/v1/bills')
          .post('/', bodyRequest)
          .replyWithError('Missing param: original_price')

        const billBusiness = makeBillBusiness()
        const addBillRequest = await billBusiness.addBill(bodyRequest)
      } catch (error) {
        expect(error.message).toBe('Missing param: original_price')
      }
    });
    test('should call the addBill database method', async () => {
      const bodyRequest = {
        due_date: '03/01/2021', name: 'bill_name', original_price: 100
      }

      nock('http://localhost:3000/api/v1/bills')
        .post('/', bodyRequest)
        .reply(201)

      const billBusiness = makeBillBusiness()

      const billBusinessSpy = jest.spyOn(billBusiness, 'addBill')

      await billBusiness.addBill(bodyRequest)

      expect(billBusinessSpy).toHaveBeenCalledWith(bodyRequest)
    });
  });

  describe('getBills', () => {
    test('call the getBills method', async () => {
      nock('http://localhost:3000/api/v1/bills')
        .get('/')
        .reply(200)

      const billBusiness = makeBillBusiness()

      const billBusinessSpy = jest.spyOn(billBusiness, 'getBills')

      await billBusiness.getBills()

      expect(billBusinessSpy).toHaveBeenCalled()
    });
  });
});