import { zodResolver } from '@hookform/resolvers/zod'
import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { TransactionContext } from '../../../../contexts/transaction.context'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchDataTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchDataTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchDataTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button disabled={isSubmitted}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
