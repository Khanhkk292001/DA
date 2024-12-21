import { StatusColorType, StatusTag } from '@/libs/components/StatusTag'
import { statusColors } from '@/libs/config/theme'
import { Box, Skeleton, Stack, SxProps, Typography } from '@mui/material'
import { useState } from 'react'
import { YoutubeIframe } from '..'

type DetailItemProps = {
  label: string
  value?: string | number | string[]
  isPending?: boolean
  labelSx?: SxProps
  textUnderLine?: boolean
  valueSx?: SxProps
  status?: {
    text: string
    color: StatusColorType
    width?: string
  }
  youtube?: {
    url: string
  }
  image?: {
    src: string
    alt?: string
  }
  audio?: {
    src: string
    controls?: boolean
  }
}

const DefaultContent = ({ value, sx }: { value: string | number | string[]; sx?: SxProps }) => {
  if (Array.isArray(value)) {
    return (
      <Stack direction="row" width="100%" flexWrap="wrap" gap={1} fontWeight={400}>
        {value.map((item, index) => (
          <Typography
            color="grey.600"
            variant="body2"
            whiteSpace="pre-wrap"
            fontWeight={400}
            sx={{ wordBreak: 'break-word', ...sx }}
            key={index}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    )
  }

  return (
    <Typography
      sx={{ wordBreak: 'break-word', ...sx }}
      color="grey.600"
      variant="body2"
      width="100%"
      overflow="hidden"
      textOverflow="ellipsis"
      fontWeight={400}
      whiteSpace="pre-wrap"
    >
      {value}
    </Typography>
  )
}

const DetailItem = ({
  label,
  value,
  youtube,
  status,
  isPending,
  valueSx,
  labelSx,
  textUnderLine,
  image,
  audio,
}: DetailItemProps) => {
  const [loadingAudio, setLoadingAudio] = useState(true)

  const valueSxTextUnderLine = textUnderLine
    ? { color: statusColors.assistant, textDecoration: 'underline', textUnderlineOffset: '2px' }
    : {}

  const handleAudioLoad = () => setLoadingAudio(false)

  return (
    <Stack spacing={1} direction="row" alignItems="stretch" height="fit-content">
      <Stack
        minWidth={120}
        padding="0px 8px"
        bgcolor="base.white"
        justifyContent="center"
        sx={{ height: 44, ...labelSx }}
      >
        <Typography variant="body2" color="grey.500">
          {label}
        </Typography>
      </Stack>

      {isPending ? (
        <Skeleton variant="text" width={336} height={44} />
      ) : (
        <Stack
          width={320}
          height="auto"
          justifyContent="center"
          alignItems="center"
          maxWidth={'fit-content'}
        >
          {image && (
            <Box
              component="img"
              src={image.src}
              alt={image.alt || 'Image'}
              sx={{
                maxWidth: '100%',
                maxHeight: 300,
                objectFit: 'cover',
                aspectRatio: '16/9',
                marginBottom: 2,
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
              }}
            />
          )}

          {youtube && <YoutubeIframe youtubeId={youtube.url} style={{ marginLeft: 0 }} />}

          {status && <StatusTag color={status.color} text={status.text} width={status.width} />}

          {audio && !isPending && (
            <Box flex={1}>
              <audio controls>
                <source src={audio.src} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Box>
          )}

          {value && <DefaultContent value={value} sx={{ ...valueSxTextUnderLine, ...valueSx }} />}
        </Stack>
      )}
    </Stack>
  )
}

export { DetailItem }
