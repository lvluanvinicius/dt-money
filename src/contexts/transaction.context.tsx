import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../libs/axios'
import { createContext } from 'use-context-selector'

interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: Date
}

interface CreateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionContextType {
  transactions: Transactions[]
  fetchDataTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  const fetchDataTransactions = useCallback(async (query?: string) => {
    return await api
      .get('transactions', {
        params: { description: query },
      })
      .then((response) => {
        setTransactions(response.data)
      })
      .catch((error) => console.error(error))
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, type, category, price } = data

      const newTransaction = await api.post('transactions', {
        description,
        type,
        category,
        price,
        createdAt: new Date(),
      })

      setTransactions((state) => [newTransaction.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchDataTransactions()
  }, [fetchDataTransactions])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchDataTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
