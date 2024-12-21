import { statusColors } from '@/libs/config/theme'
import { Stack, Typography } from '@mui/material'

export type StatusColorType = 'red' | 'grey' | 'yellow' | 'green' | 'blue'
type StatusTagProps = { color: StatusColorType; text: string; width?: string }

const colorStatusMap = {
  red: {
    bgColor: statusColors.error_pale,
    color: statusColors.error,
  },
  grey: {
    bgColor: 'grey.50',
    color: 'grey.600',
  },
  yellow: {
    bgColor: statusColors.warn_pale,
    color: statusColors.warn_dark,
  },
  green: {
    bgColor: statusColors.success_pale,
    color: statusColors.success,
  },
  blue: {
    bgColor: '#89CFF0',
    color: '#0476D0',
  },
}

const StatusTag = ({ color, text, width = '80px' }: StatusTagProps) => {
  const bgColor = colorStatusMap[color].bgColor

  return (
    <Stack
      color={colorStatusMap[color].color}
      bgcolor={bgColor}
      borderRadius="4px"
      width={width}
      height={24}
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize="11px" fontWeight={500} lineHeight="16px">
        {text}
      </Typography>
    </Stack>
  )
}

export { StatusTag }
