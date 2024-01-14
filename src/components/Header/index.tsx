import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import LOGOIMAGE from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LOGOIMAGE} alt="" />

        <NewTransactionButton>Nova Transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
