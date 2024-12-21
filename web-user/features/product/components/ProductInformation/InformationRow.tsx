import { colors, Stack, Typography } from '@mui/material'

interface InformationRowProps {
  label: string
  value: string
}

export const InformationRow: React.FC<InformationRowProps> = ({ label, value }) => {
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start" flexWrap="nowrap">
      <Typography width="30%" fontWeight={400} lineHeight="22px" fontSize={14} color={colors.grey[700]}>
        {label}
      </Typography>

      <Typography width="70%" fontWeight={400} lineHeight="22px" fontSize={14} color={colors.grey[700]}>
        {value}
      </Typography>
    </Stack>
  )
}
