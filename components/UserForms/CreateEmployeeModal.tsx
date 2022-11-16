import React, { useState } from 'react'
import {
  Button,
  LoadingOverlay,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'

type CreateEmployeeProps = {
  id: number
}

const CreateEmployeeModal = (props: CreateEmployeeProps) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm({ initialValues: { registration: '', group: 0 } })

  const handleSubmit = async () => {
    try {
      const { ['uniplacdevweb.token']: token } = parseCookies()

      const payload = { ...form.values, userId: props.id }
      await axios.post('http://localhost:5000/employees', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLoading(true)
      await new Promise((r) => setTimeout(r, 5000))
      setLoading(false)
      setOpened(false)
      showNotification({
        title: 'Funcionario criado',
        message: 'Funcionario criado com sucesso',
      })
      router.push(`/admin/users/${props.id}`)
    } catch (error: any) {
      showNotification({
        title: 'Deu ruim',
        message: error.message,
        color: 'red',
      })
      setLoading(false)
      setOpened(false)
    }
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Criar funcionario'
        centered
      >
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label='Registro'
              {...form.getInputProps('registration')}
            />
            <NumberInput label='Grupo' {...form.getInputProps('group')} />
            <Button type='submit'>Criar</Button>
          </Stack>
        </form>
      </Modal>

      <Button onClick={() => setOpened(true)}>Open Modal</Button>
    </div>
  )
}

export default CreateEmployeeModal
