export interface AccountDetails {
  accountId: string
  balance: number
  currentPage: number
  totalPages: number
  pageSize: number
  operationDTOS: Operation[]
}

export interface Operation  {
  id: number
  date: string
  amount: number
  type: string
  accountId: string
}
