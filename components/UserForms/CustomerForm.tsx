import { Stack, Title, Checkbox, NumberInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

type CustomerFormProps = {
  customerId: number
  buysOnCredit: boolean
  creditPayDate: number
}

const CustomerForm = (props: CustomerFormProps) => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      buysOnCredit: props.buysOnCredit,
      creditPayDate: props.creditPayDate,
    },
    validate: {
      creditPayDate: (value) =>
        value >= 1 && value <= 30
          ? null
          : 'Valor precisa ser um numero entre 1 e 30',
    },
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        buysOnCredit: form.values.buysOnCredit,
        creditPayDate: form.values.creditPayDate,
      }
      const { ['uniplacdevweb.token']: token } = parseCookies()
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/customers/${props.customerId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setLoading(false)
      showNotification({
        title: 'Dados atualizados',
        message: `Dados foram atualizados`,
      })
    } catch (error: any) {
      setLoading(false)
      showNotification({
        title: 'Deu ruim',
        message: error.message,
        color: 'red',
      })
    }
  }
  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Checkbox
            label='Pode pagar fiado'
            {...form.getInputProps('buysOnCredit', { type: 'checkbox' })}
          />
          <NumberInput
            label='Data de pagamento'
            description='Numero de 1 a 30'
            min={1}
            max={30}
            {...form.getInputProps('creditPayDate')}
          />

          <Button fullWidth type='submit' loading={loading}>
            Atualizar
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default CustomerForm
