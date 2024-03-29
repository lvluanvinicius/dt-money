import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-alert-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const NewTransactionModalContainer = styled.div``

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;

  background: ${(props) => props.theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      border: 0;
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme['green-700']};
        transition: background-color 0.3s;
      }
    }
  }
`

export const DialogClose = styled(Dialog.Cancel)`
  position: absolute;
  background: transparent;
  border: 0;
  outline: 0;
  color: ${(props) => props.theme.white};

  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 0.5rem;
  gap: 1rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

const RadioGroupItem = styled(RadioGroup.Item)``

export const TransactionTypeButton = styled(
  RadioGroupItem,
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    background: ${(props) => props.theme['gray-600']};
    transition: background-color 0.3s;
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
    transition: background-color 0.3s;
  }
`
