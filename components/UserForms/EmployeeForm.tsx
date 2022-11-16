import { Button, NumberInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

type EmployeeFormProps = {
  userId: number
  employeeId: number
  registration: string
  group: number
}

const EmployeeForm = (props: EmployeeFormProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: { registration: props.registration, group: props.group },
    validate: {
      registration: (value) =>
        value.length > 0 ? null : 'Não pode ficar vazio',
    },
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = { userId: props.userId, ...form.values }
      const { ['uniplacdevweb.token']: token } = parseCookies()
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/employees/${props.employeeId}`,
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
          <TextInput label='Registro' {...form.getInputProps('registration')} />
          <NumberInput label='Grupo' {...form.getInputProps('group')} />
          <Button type='submit' loading={loading}>
            Atualizar
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default EmployeeForm
