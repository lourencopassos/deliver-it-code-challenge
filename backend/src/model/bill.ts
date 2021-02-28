import mongoose, { Schema } from 'mongoose';


export const BillSchema = new Schema({
  name: {
    type: String,
    required: 'Bill name required. At least 10 characters.',
    min: 10
  },
  original_price: {
    type: Number,
    required: 'Original price required',
    min: 0.01,
  },
  due_date: {
    type: Date,
    required: true,
  },
  paid_at: {
    type: Date,
  },
  price_with_interest: {
    type: Number,
    min: 0.01
  },
  overdue_days: {
    type: Number
  }
})


export type BillInputDTO = {
  original_price: number,
  name: string,
  due_date: string,
  paid_at?: string,
  price_with_intereset?: number,
  overdue_days?: number
}

export type BillUpdateDTO = {
  original_price: number,
  name: string,
  due_date: string,
  paid_at?: string,
  price_with_intereset?: number,
  overdue_days?: number,
  id?: string
}

export const BillModel = mongoose.model('bills', BillSchema);