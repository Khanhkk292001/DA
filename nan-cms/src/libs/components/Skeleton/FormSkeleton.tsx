import { Skeleton, Stack } from '@mui/material'

type FormSkeletonProps = {
  rows?: number
  cols?: number
}

const FormSkeleton = ({ rows = 5, cols = 2 }: FormSkeletonProps) => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width="140px" height={30} />
        <Skeleton variant="rounded" width="200px" height={24} />
      </Stack>

      <Stack spacing={1}>
        {Array.from({ length: rows }, (_, i) => (
          <Stack key={i} spacing={3} direction="row">
            {Array.from({ length: cols }, (_, j) => (
              <Stack
                key={j}
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Skeleton variant="rounded" width="120px" height={36} />
                <Skeleton variant="rounded" width="320px" height={40} />
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export { FormSkeleton }
