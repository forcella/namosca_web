import { format, parseISO } from 'date-fns'

export const formatarData = data => {
  return data ? format(
    parseISO(data),
    "dd/MM/yyyy'"
  ) : 'não informado'
}
