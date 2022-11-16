import {
  Button,
  Card,
  FileInput,
  Image,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { ImageUploadResponse } from '../../../libs/types'

interface FormValues {
  name: string
  description: string
  picture: Blob | null
  price: number
}

const CreateProductPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      picture: null,
      price: 0.0,
    },
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { ['uniplacdevweb.token']: token } = parseCookies()

      const imageFormData = new FormData()

      form.values.picture && imageFormData.append('file', form.values.picture)
      const imageUploadResponse = await axios.post(
        'http://localhost:5000/images',
        imageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const uploadedImage: ImageUploadResponse = imageUploadResponse.data
      const payload = {
        name: form.values.name,
        description: form.values.description,
        picture: uploadedImage.filename,
        price: form.values.price,
      }

      await axios.post('http://localhost:5000/products', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLoading(false)
      showNotification({
        title: 'Produto criado',
        message: `Produto ${form.values.name} criado com sucesso`,
        color: 'green',
      })
      router.push('/admin/products')
    } catch (error: any) {
      setLoading(false)
      showNotification({
        title: 'Deu Ruim',
        message: error.response.data.message,
        color: 'red',
      })
    }
  }

  return (
    <div>
      <Title>Criar Produto</Title>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={3}>Informações do produto</Title>
            <TextInput label='Nome' {...form.getInputProps('name')} />
            <Textarea
              autosize
              label='Descrição'
              minRows={4}
              {...form.getInputProps('description')}
            />
            <FileInput label='Foto' {...form.getInputProps('picture')} />
            {form.values.picture ? (
              <SimpleGrid
                cols={3}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt='xl'
              >
                <Card withBorder shadow='md' p='md' radius='md'>
                  <Card.Section>
                    <Image
                      src={URL.createObjectURL(form.values.picture)}
                      alt=''
                    />
                  </Card.Section>
                  <Button
                    color='red'
                    fullWidth
                    mt='md'
                    radius='md'
                    onClick={() => form.setValues({ picture: null })}
                  >
                    Remover
                  </Button>
                </Card>
              </SimpleGrid>
            ) : undefined}
            <NumberInput
              label='Preço'
              precision={2}
              min={0}
              step={0.01}
              {...form.getInputProps('price')}
            />
            <Button loading={loading} type='submit'>
              Criar
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  )
}

export default CreateProductPage
