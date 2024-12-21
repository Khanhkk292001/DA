import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BuildIcon from '@mui/icons-material/Build'
import CategoryIcon from '@mui/icons-material/Category'
import DevicesIcon from '@mui/icons-material/Devices'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import InventoryIcon from '@mui/icons-material/Inventory'
import PersonIcon from '@mui/icons-material/Person'
import PolicyIcon from '@mui/icons-material/Policy'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'

export type MenuType = {
  title: string
  icon: React.ElementType | React.ReactNode
  href: string
  active_icon: React.ElementType | React.ReactNode
  disabled?: boolean
  subHref?: string
  roles: string[] // Các vai trò được phép truy cập
}

// Cập nhật danh sách menus
export const menus: MenuType[] = [
  {
    href: '/',
    title: 'Tổng quan',
    subHref: 'dashboard',
    icon: StackedLineChartIcon,
    active_icon: StackedLineChartIcon,
    roles: ['admin', 'super_admin'], // Cho phép cả admin và super admin
  },
  {
    href: '/categories',
    title: 'Danh mục',
    icon: CategoryIcon,
    active_icon: CategoryIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/users',
    title: 'Người dùng',
    icon: PersonIcon,
    active_icon: PersonIcon,
    roles: ['super_admin'], // Chỉ super admin được phép truy cập
  },
  {
    href: '/equipments',
    title: 'Thiết bị',
    icon: DevicesIcon,
    active_icon: DevicesIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/package',
    title: 'Gói thiết bị',
    icon: InventoryIcon,
    active_icon: InventoryIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/policies',
    title: 'Chính sách',
    icon: PolicyIcon,
    active_icon: PolicyIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/maintenances',
    title: 'Bảo trì',
    icon: BuildIcon,
    active_icon: BuildIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/damage-reports',
    title: 'Báo cáo hỏng',
    icon: ReportProblemIcon,
    active_icon: ReportProblemIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/rentals',
    title: 'Đơn thuê',
    icon: EventAvailableIcon,
    active_icon: EventAvailableIcon,
    roles: ['admin', 'super_admin'],
  },
  {
    href: '/discounts',
    title: 'Mã giảm giá',
    icon: AttachMoneyIcon,
    active_icon: AttachMoneyIcon,
    roles: ['super_admin'], // Chỉ super admin được phép truy cập
  },
]

export function getFilteredMenus(userRole: string): MenuType[] {
  return menus.filter((menu) => menu.roles.includes(userRole))
}
