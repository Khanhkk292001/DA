import { uploadAudio } from '@/libs/api/form'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useMutation } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController } from 'react-hook-form'

const DropzoneContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.grey[50],
  transition: 'border-color 0.3s, background-color 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[100],
  },
}))

const DropzoneText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontSize: theme.typography.body2.fontSize,
}))

const AudioPreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
}))

const RemoveButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}))

const UploadAudio = ({
  name,
  control,
  defaultValue,
  helperText,
  controlProps,
  width = '100%',
  padding,
  content,
  sx,
  ...props
}: {
  name: string
  control: any
  defaultValue?: any
  helperText?: string | JSX.Element
  controlProps?: any
  width?: string
  padding?: string
  content?: string
  sx?: any
  [key: string]: any
}) => {
  const {
    field: { onChange, value, name: fieldName },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  const [audio, setAudio] = useState<string | null>(value ?? null)

  const { mutate, isPending } = useMutation({
    mutationFn: uploadAudio,
    onSuccess: async (data) => {
      setAudio(data.path)
      onChange(data.path)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        mutate(file)
      }
    },
    [onChange, mutate],
  )

  const { getRootProps, getInputProps } = useDropzone({
    // @ts-ignore
    accept: 'audio/*',
    onDrop,
    multiple: false,
  })

  const handleRemoveAudio = (event: React.MouseEvent) => {
    event.stopPropagation()
    setAudio(null)
    onChange(null)
  }

  return (
    <Box width={width} padding={padding} sx={sx}>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} id={fieldName} hidden />
        {!audio ? (
          <DropzoneText variant="body2">
            {content || 'Drag and drop audio file here or click to select'}
          </DropzoneText>
        ) : (
          <>
            {isPending ? (
              <CircularProgress size={24} />
            ) : (
              <AudioPreview>
                <audio
                  controls
                  src={`${process.env.NEXT_PUBLIC_API_URL}/streams/audio?path=${audio}`}
                  style={{ width: '100%' }}
                >
                  Your browser does not support the audio element.
                </audio>
                <RemoveButton color="error" onClick={handleRemoveAudio}>
                  <DeleteOutlineIcon />
                </RemoveButton>
              </AudioPreview>
            )}
          </>
        )}
      </DropzoneContainer>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {helperText || error.message}
        </Typography>
      )}
    </Box>
  )
}

export { UploadAudio }
