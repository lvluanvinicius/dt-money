import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-alert-dialog'
import * as zod from 'zod'

import {
  Content,
  DialogClose,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../contexts/transaction.context'
import { useContextSelector } from 'use-context-selector'

const newTransactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionInputs = zod.z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionInputs) {
    const { description, type, category, price } = data
    createTransaction({ description, type, category, price })
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Titulo</Dialog.Title>
        <DialogClose>
          <X size={32} />
        </DialogClose>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
            required
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton value="income" variant="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton value="outcome" variant="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitted}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
