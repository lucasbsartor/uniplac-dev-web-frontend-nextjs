import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Text,
  Button,
  Container,
} from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'

type LayoutShellProps = {
  children: React.ReactNode
}

const LayoutShell = ({ children }: LayoutShellProps) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p='md'>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Link href='/' passHref>
              <Button variant='subtle' size='xl' component='a'>
                Fabulosa Pastelaria do Ze
              </Button>
            </Link>
            <div style={{ flex: 1, flexGrow: 1 }} />
            <Link href='/auth/login' passHref>
              <Button component='a'>Login</Button>
            </Link>
          </div>
        </Header>
      }
    >
      <Container>{children}</Container>
    </AppShell>
  )
}

export default LayoutShell
