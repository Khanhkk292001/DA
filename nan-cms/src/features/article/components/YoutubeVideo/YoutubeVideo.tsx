import { Box, FormHelperText } from '@mui/material'
import React from 'react'
import { FieldError } from 'react-hook-form'
import { ZodError } from 'zod'
import { YoutubeUrlSchema, convertUrlYoutube } from '../..'

interface YoutubeVideoProps {
  youtubeUrl: string | undefined
  errMessage?: FieldError | undefined
}

interface YoutubeFrameProps {
  youtubeId: string | undefined
  style?: React.CSSProperties
}

const YoutubeErrorMessage: React.FC<{ error: ZodError<string> }> = ({ error }) => {
  const parsedMessage = JSON.parse(error.message)[0].message

  return (
    <Box sx={{ marginLeft: '128px !important', mt: 0 }}>
      <FormHelperText error sx={{ marginTop: 0 }}>
        {parsedMessage}
      </FormHelperText>
    </Box>
  )
}

export const YoutubeIframe: React.FC<YoutubeFrameProps> = ({ youtubeId, style }) => (
  <iframe
    width="288"
    height="162"
    src={`https://www.youtube.com/embed/${convertUrlYoutube(youtubeId as string)}`}
    allowFullScreen
    style={{ border: 'none', marginLeft: 128, marginTop: 8, ...style }}
  />
)

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ youtubeUrl, errMessage }) => {
  if (!youtubeUrl) return
  if (errMessage) return

  const result = YoutubeUrlSchema.safeParse(youtubeUrl)

  return result.success ? (
    <YoutubeIframe youtubeId={result.data} />
  ) : (
    <YoutubeErrorMessage error={result.error} />
  )
}

export { YoutubeVideo }
