import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import LayoutShell from '../components/Layout/LayoutShell'
import { NotificationsProvider } from '@mantine/notifications'
import { AuthProvider } from '../contexts/AuthContext'
import { ModalsProvider } from '@mantine/modals'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Fabulosa Pastelaria do Ze</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <ModalsProvider>
            <AuthProvider>
              <LayoutShell>
                <Component {...pageProps} />
              </LayoutShell>
            </AuthProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}
