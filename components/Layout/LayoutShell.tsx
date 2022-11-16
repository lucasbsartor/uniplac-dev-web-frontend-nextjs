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
  ScrollArea,
  Divider,
} from '@mantine/core'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AdminNavLinks from './AdminNavLinks'
import UserNavLinks from './UserNavLinks'
import UserProfilebutton from './UserProfileButton'

type LayoutShellProps = {
  children: React.ReactNode
}

const LayoutShell = ({ children }: LayoutShellProps) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const { isAuthenticated, signOut, user } = useContext(AuthContext)
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
        isAuthenticated ? (
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section grow component={ScrollArea}>
              {user?.employee ? <AdminNavLinks /> : undefined}
              <UserNavLinks />
            </Navbar.Section>
            <Navbar.Section>
              <Divider mb='xs' />
              {user && (
                <UserProfilebutton
                  image={undefined}
                  email={user.email}
                  name={user.name}
                />
              )}
            </Navbar.Section>
          </Navbar>
        ) : undefined
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
            {isAuthenticated ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Link href='/auth/login' passHref>
                <Button component='a'>Login</Button>
              </Link>
            )}
          </div>
        </Header>
      }
    >
      <Container>{children}</Container>
    </AppShell>
  )
}

export default LayoutShell
