import { NavLink, ThemeIcon } from '@mantine/core'
import { IconBuildingStore, IconShoppingCart } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'

const UserNavLinks = () => {
  const links = [
    {
      icon: <IconBuildingStore size={16} />,
      color: 'blue',
      label: 'Produtos',
      url: '/products',
    },
    {
      icon: <IconShoppingCart size={16} />,
      color: 'teal',
      label: 'Carrinho',
      url: '/products',
    },
  ]
  return (
    <div>
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
    </div>
  )
}

export default UserNavLinks
