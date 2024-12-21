export const getTextRole = (role: string | number | undefined) => {
  switch (role) {
    case 0:
      return 'User'
    case 1:
      return 'Admin'
    case 2:
      return 'Manager'
    case 3:
      return 'Staff'
    default:
      return 'Unknown'
  }
}

export const getColorRole = (role: string | number | undefined) => {
  switch (role) {
    case 0:
      return 'green'
    case 1:
      return 'red'
    case 2:
      return 'yellow'
    case 3:
      return 'blue'
    default:
      return 'grey'
  }
}
