// Auto-trigger hot reload
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'

import { Media } from './payload/collections/Media'
import { LearningReasons } from './payload/collections/LearningReasons'
import { JourneyPhases } from './payload/collections/JourneyPhases'
import { GalleryItems } from './payload/collections/GalleryItems'
import { Testimonials } from './payload/collections/Testimonials'
import { FAQs } from './payload/collections/FAQs'

import { Hero } from './payload/globals/Hero'
import { Method } from './payload/globals/Method'
import { Week } from './payload/globals/Week'
import { Story } from './payload/globals/Story'
import { CTA } from './payload/globals/CTA'

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Media,
    LearningReasons,
    JourneyPhases,
    GalleryItems,
    Testimonials,
    FAQs,
  ],

  globals: [
    Hero,
    Method,
    Week,
    Story,
    CTA,
  ],

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: process.env.R2_REGION || 'auto',
        endpoint: process.env.R2_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || 'SECRET_KEY',
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    }
  }),
  
  sharp,
})
