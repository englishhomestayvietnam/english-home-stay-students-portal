import fs from 'fs/promises'
import sharp from 'sharp'
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

function isCompressibleImage(file: any): boolean {
  if (!file) return false
  const name = (file.name || '').toLowerCase()
  const mime = (file.mimetype || '').toLowerCase()
  if (name.endsWith('.svg') || mime.includes('svg')) return false
  return (
    mime.startsWith('image/') ||
    /\.(jpg|jpeg|png|webp|avif|tiff|tif|heic|heif)$/i.test(name)
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
    description: 'Hỗ trợ tải lên tệp dung lượng lớn (lên tới 200MB), tự động nén thu nhỏ WebP và hỗ trợ ảnh HEIC/iPhone.',
  },
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true,
    constructorOptions: {
      limitInputPixels: false, // Prevent Sharp from failing on ultra-large 50-200MB images
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80, // High-efficiency WebP compression
      },
    },
    resizeOptions: {
      width: 1920, // Max width 1920px (Full HD / 4K ready)
      height: 1920, // Max height 1920px
      fit: 'inside', // Keep aspect ratio without cropping
      withoutEnlargement: true,
    },
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation, req }) => {
        if (operation === 'create' || operation === 'update') {
          const fileObj =
            (req as any).file ||
            ((req as any).files?.file) ||
            ((req as any).files && Object.values((req as any).files)[0])

          if (fileObj) {
            try {
              let buffer: Buffer | null = null
              if (fileObj.data && Buffer.isBuffer(fileObj.data) && fileObj.data.length > 0) {
                buffer = fileObj.data
              } else if (fileObj.tempFilePath) {
                buffer = await fs.readFile(fileObj.tempFilePath)
              }

              if (buffer && buffer.length > 0) {
                // 1. Convert HEIC/HEIF to JPEG first
                if (isHeic(fileObj)) {
                  req.payload.logger.info(`[HEIC Converter] Converting "${fileObj.name}" to JPEG...`)
                  const converted = await heicConvert({
                    buffer,
                    format: 'JPEG',
                    quality: 0.92,
                  })
                  buffer = Buffer.from(converted)
                  fileObj.name = fileObj.name.replace(/\.(heic|heif)$/i, '.jpg')
                  fileObj.mimetype = 'image/jpeg'
                }

                // 2. Shrink and convert any compressible image to optimized WebP
                if (isCompressibleImage(fileObj)) {
                  const originalSizeMB = (buffer.length / (1024 * 1024)).toFixed(2)
                  req.payload.logger.info(`[Media Shrink] Shrinking "${fileObj.name}" (${originalSizeMB} MB) to WebP max 1920px...`)

                  const shrunkenBuffer = await sharp(buffer, { limitInputPixels: false })
                    .rotate() // Automatically correct iPhone/EXIF rotation
                    .resize({
                      width: 1920,
                      height: 1920,
                      fit: 'inside',
                      withoutEnlargement: true,
                    })
                    .webp({ quality: 80 })
                    .toBuffer()

                  const newSizeKB = (shrunkenBuffer.length / 1024).toFixed(1)
                  req.payload.logger.info(`[Media Shrink] Successfully shrunk "${fileObj.name}" from ${originalSizeMB} MB -> ${newSizeKB} KB`)

                  fileObj.data = shrunkenBuffer
                  fileObj.size = shrunkenBuffer.length
                  fileObj.mimetype = 'image/webp'
                  fileObj.name = fileObj.name.replace(/\.[^.]+$/, '') + '.webp'

                  if (fileObj.tempFilePath) {
                    await fs.writeFile(fileObj.tempFilePath, shrunkenBuffer)
                  }

                  ;(req as any).file = fileObj
                  if ((req as any).files?.file) {
                    ;(req as any).files.file = fileObj
                  }
                }
              }
            } catch (err) {
              req.payload.logger.error(`[Media Hook Error] Failed to process/shrink file: ${err}`)
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

