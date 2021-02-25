import mongoose, { Schema } from 'mongoose';


export const BillSchema = new Schema({
  name: {
    type: String,
    required: 'Bill name required. At least 10 characters.',
    min: 10
  },
  price: {
    type: Number,
    required: 'Bill price required',
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
  price: number,
  name: string,
  due_date: Date,
  paid_at?: Date,
  price_with_intereset?: number,
  overdue_days?: number
}

export type BillUpdateDTO = {
  price?: number,
  name?: string,
  due_date?: Date,
  paid_at?: Date,
  price_with_intereset?: number,
  overdue_days?: number
}

export const BillModel = mongoose.model('bills', BillSchema);