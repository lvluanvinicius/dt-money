import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />
      <button>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
