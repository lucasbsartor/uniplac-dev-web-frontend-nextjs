import { NavLink, ThemeIcon } from '@mantine/core'
import { IconUsers, IconBuildingStore } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'

const AdminNavLinks = () => {
  const links = [
    {
      icon: <IconUsers size={16} />,
      color: 'blue',
      label: 'Usuarios',
      url: '/admin/users',
    },
    {
      icon: <IconBuildingStore size={16} />,
      color: 'teal',
      label: 'Produtos',
      url: '/admin/products',
    },
  ]
  return (
    <div>
      <NavLink label='Admin' childrenOffset={28} defaultOpened>
        {links.map((link) => (
          <Link href={link.url} passHref key={link.label}>
            <NavLink
              component='a'
              label={link.label}
              icon={
                <ThemeIcon color={link.color} variant='light'>
                  {link.icon}
                </ThemeIcon>
              }
            />
          </Link>
        ))}
      </NavLink>
    </div>
  )
}

export default AdminNavLinks
