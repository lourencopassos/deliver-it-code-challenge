import moment from 'moment';

export function isBillExpired(due_date: string) {

  const formatedDueDate = moment(due_date).format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')

  return moment(formatedDueDate).diff(today, 'day')

}