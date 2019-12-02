import { format, parseISO } from 'date-fns'

export const formatarData = data => {
  return data ? format(
    parseISO(data),
    "dd/MM/yyyy'"
  ) : 'não informado'
}

export const formatarDataHora = data => {
  return data ? format(
    parseISO(data),
    "dd/MM/yyyy HH:mm'"
  ) : 'não informado'
}
