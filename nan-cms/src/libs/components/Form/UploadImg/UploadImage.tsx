import { uploadImage } from '@/libs/api/form'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import { Box, IconButton, Stack, Typography } from '@mui/material'
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

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}))

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: 'white',
  },
}))

const UploadImage = ({
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

  const [image, setImage] = useState<string | null>(value ?? null)

  const { mutate } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.url)
      onChange(data.url)
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
    [onChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    // @ts-ignore
    accept: 'image/*',
    onDrop,
    multiple: false,
  })

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation()
    setImage(null)
    onChange(null)
  }

  return (
    <Box width={width} padding={padding} sx={sx}>
      <DropzoneContainer {...getRootProps()} height={300}>
        <input {...getInputProps()} id={fieldName} hidden />
        {!image ? (
          <ImagePreview>
            {value ? (
              <img
                src={value}
                alt="Preview"
                style={{ width: '100%', height: '240px', objectFit: 'contain' }}
              />
            ) : (
              <Stack
                direction="column"
                spacing={1}
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="240px"
              >
                <InsertPhotoIcon />
              </Stack>
            )}
          </ImagePreview>
        ) : (
          <ImagePreview>
            <img
              src={image ?? defaultValue}
              alt="Preview"
              style={{ width: '100%', height: '240px', objectFit: 'contain' }}
            />
            <RemoveButton color="error" onClick={handleRemoveImage}>
              <DeleteOutlineIcon />
            </RemoveButton>
          </ImagePreview>
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

export { UploadImage }
