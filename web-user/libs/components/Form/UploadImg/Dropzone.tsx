import { base } from '@/libs/configs'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'

type DropzoneProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  haveImage?: boolean
}

export const DEFAULT_DROPZONE_WIDTH = '100%'
const DROPZONE_WIDTH_WITH_IMAGE = 500 / 3

const Dropzone = ({ getInputProps, getRootProps, haveImage }: DropzoneProps) => {
  return (
    <Stack
      {...getRootProps({ className: 'dropzone' })}
      width={haveImage ? DROPZONE_WIDTH_WITH_IMAGE : DEFAULT_DROPZONE_WIDTH}
      minHeight={500 / 3}
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.50"
      sx={{
        cursor: 'pointer',
        borderRadius: 0.5,
        border: '1px dashed',
        borderColor: base.separate_contents,
      }}
    >
      <input {...getInputProps()} />

      <Stack width={206} alignItems="center" textAlign="center" spacing="4px">
        <Image src="/assets/svgs/upload.svg" width={24} height={24} alt="choose images" />

        <Typography variant="body2" fontWeight={400} color="grey.500">
          {haveImage ? 'Chọn ảnh' : 'Thêm ảnh bằng cách kéo thả hoặc chọn từ tập tin'}
        </Typography>
      </Stack>
    </Stack>
  )
}

export { Dropzone }
