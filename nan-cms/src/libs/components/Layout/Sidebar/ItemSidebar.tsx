import {
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled,
} from '@mui/material'
import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-router-events'
import { ElementType } from 'react'
import { MenuType } from './menu'

type StyleListItemButtonType = {
  active?: boolean
}

type ListItemButtonType = {
  menu: MenuType
}

const ListItemButton: React.FC<ListItemButtonType> = ({ menu }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleDirection = () => {
    router.push(menu.href)
  }

  const isActive = menu.subHref
    ? pathname === menu.href || menu.subHref === pathname.split('/')[1]
    : pathname.includes(menu.href)

  const IconComponent: ElementType = isActive ? menu.active_icon : (menu.icon as any)

  return (
    <StyleListItemButton active={isActive} onClick={handleDirection} disabled={menu.disabled}>
      <ListItemIcon>{IconComponent && <IconComponent />}</ListItemIcon>
      <ListItemText primary={menu.title} />
    </StyleListItemButton>
  )
}

const StyleListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyleListItemButtonType>(({ theme, active }) => ({
  gap: 12,
  height: 60,
  width: 224,
  margin: '2px 0',
  borderRadius: '12px',
  padding: '18px 16px 18px 20px',
  boxShadow: active ? '4px 4px 16px 0px #0000000D' : 'none',
  color: active ? theme.palette.base.primary : theme.palette.mono[600],
  backgroundColor: active ? theme.palette.base.primary_pale : theme.palette.common.white,
}))

const ListItemIcon = styled(MuiListItemIcon)({
  minWidth: 20,
})

const ListItemText = styled(MuiListItemText)({
  '.MuiListItemText-primary': {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '16px',
  },
  margin: 0,
})

export { ListItemButton, ListItemIcon, ListItemText }
