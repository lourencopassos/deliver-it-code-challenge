import moment from 'moment';

export function billDayDifferenceToday(due_date: string | Date) {

  const formatedDueDate = moment(due_date).format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')

  return moment(formatedDueDate).diff(today, 'day')

}

export function billDayDifferencePaidDate(due_date: string, paid_at: string) {

  const formatedDueDate = moment(due_date).format('YYYY-MM-DD')
  const formatedPaidAt = moment(paid_at).format('YYYY-MM-DD')

  return moment(formatedDueDate).diff(formatedPaidAt, 'day')

}