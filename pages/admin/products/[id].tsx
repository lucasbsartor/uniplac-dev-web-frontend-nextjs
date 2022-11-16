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
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { ImageUploadResponse, Product } from '../../../libs/types'

type Data = {
  product: Product
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  ctx
) => {
  const { ['uniplacdevweb.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    }
  }

  const { id } = ctx.query

  const productResponse = await axios.get(
    `http://localhost:5000/products/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  const product: Product = productResponse.data

  return {
    props: {
      data: {
        product,
      },
    },
  }
}

type FormData = {
  name: string
  description: string
  picture: string | undefined | null | Blob
  price: number
}

const AdminProductPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormData>({
    initialValues: {
      name: data.product.name,
      description: data.product.description,
      picture: data.product.picture,
      price: data.product.price,
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
      await axios.patch(
        `http://localhost:5000/products/${data.product.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLoading(false)
      showNotification({
        title: 'Produto atualizado',
        message: `Produto ${form.values.name} atualizado com sucesso`,
        color: 'green',
      })
      router.push(router.asPath)
    } catch (error: any) {
      setLoading(false)
      showNotification({
        title: 'Deu ruim',
        message: error.message,
        color: 'red',
      })
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const { ['uniplacdevweb.token']: token } = parseCookies()
      await axios.delete(`http://localhost:5000/products/${data.product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLoading(false)
      showNotification({
        title: 'Produto removido',
        message: `Produto ${form.values.name} removido com sucesso`,
        color: 'green',
      })
      router.push('/admin/products')
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
      <Title>{data.product.name}</Title>
      <Button color='red' loading={loading} onClick={handleDelete}>
        Deletar
      </Button>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={3}>Informações do Produto</Title>
            <TextInput label='Nome' {...form.getInputProps('name')} />
            <Textarea
              autosize
              label='Descrição'
              minRows={4}
              {...form.getInputProps('description')}
            />

            {typeof form.values.picture === 'string' ? (
              <div>
                <TextInput
                  label='Foto'
                  {...form.getInputProps('picture')}
                  disabled
                />
              </div>
            ) : (
              <div>
                <FileInput label='Foto' {...form.getInputProps('picture')} />
              </div>
            )}
            {form.values.picture ? (
              <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Card withBorder shadow='md' p='md' radius='md'>
                  <Card.Section>
                    <Image
                      src={
                        form.values.picture instanceof Blob
                          ? URL.createObjectURL(form.values.picture)
                          : `http://localhost:5000/images/${data.product.picture}`
                      }
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
              Atualizar
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  )
}

export default AdminProductPage
