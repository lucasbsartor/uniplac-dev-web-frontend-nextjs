import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}))

interface UserButtonProps extends UnstyledButtonProps {
  image: string | undefined
  name: string
  email: string
  icon?: React.ReactNode
}

const UserProfilebutton = ({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) => {
  const { classes } = useStyles()

  return (
    <Link href='/profile' passHref>
      <UnstyledButton component='a' className={classes.user} {...others}>
        <Group>
          <Avatar src={image} radius='xl' />

          <div style={{ flex: 1 }}>
            <Text size='sm' weight={500}>
              {name}
            </Text>

            <Text color='dimmed' size='xs'>
              {email}
            </Text>
          </div>

          {icon || <IconChevronRight size={14} stroke={1.5} />}
        </Group>
      </UnstyledButton>
    </Link>
  )
}

export default UserProfilebutton
