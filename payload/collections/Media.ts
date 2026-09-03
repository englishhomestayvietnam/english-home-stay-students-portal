import fs from 'fs/promises'
import heicConvert from 'heic-convert'
import type { CollectionConfig } from 'payload'

function isHeic(file: any): boolean {
  if (!file) return false
  const name = (file.name || '').toLowerCase()
  const mime = (file.mimetype || '').toLowerCase()
  return (
    name.endsWith('.heic') ||
    name.endsWith('.heif') ||
    mime.includes('heic') ||
    mime.includes('heif')
  )
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    group: 'System',
  },
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 75, // Adjust compression quality (0-100)
      },
    },
    resizeOptions: {
      width: 1920, // Max width, will downscale larger images
      withoutEnlargement: true,
    },
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation, req }) => {
        if (operation === 'create' || operation === 'update') {
          const fileObj = (req as any).file || ((req as any).files?.file) || ((req as any).files && Object.values((req as any).files)[0])
          if (fileObj && isHeic(fileObj)) {
            try {
              req.payload.logger.info(`[HEIC Converter] Detected HEIC file: "${fileObj.name}". Converting to JPEG...`)

              let inputBuffer: Buffer | null = null
              if (fileObj.data && Buffer.isBuffer(fileObj.data) && fileObj.data.length > 0) {
                inputBuffer = fileObj.data
              } else if (fileObj.tempFilePath) {
                inputBuffer = await fs.readFile(fileObj.tempFilePath)
              }

              if (inputBuffer && inputBuffer.length > 0) {
                const converted = await heicConvert({
                  buffer: inputBuffer,
                  format: 'JPEG',
                  quality: 0.92,
                })

                const jpegBuffer = Buffer.from(converted)
                fileObj.data = jpegBuffer
                fileObj.size = jpegBuffer.length
                fileObj.name = fileObj.name.replace(/\.(heic|heif)$/i, '.jpg')
                if (!fileObj.name.toLowerCase().endsWith('.jpg') && !fileObj.name.toLowerCase().endsWith('.jpeg')) {
                  fileObj.name += '.jpg'
                }
                fileObj.mimetype = 'image/jpeg'

                if (fileObj.tempFilePath) {
                  await fs.writeFile(fileObj.tempFilePath, jpegBuffer)
                }

                ;(req as any).file = fileObj
                req.payload.logger.info(`[HEIC Converter] Successfully converted to JPEG: "${fileObj.name}" (${jpegBuffer.length} bytes)`)
              }
            } catch (err) {
              req.payload.logger.error(`[HEIC Converter] Failed to convert HEIC to JPEG: ${err}`)
            }
          }
        }
        return args
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.imagekit?.url) {
          doc.url = doc.imagekit.url
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

