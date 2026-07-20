// Auto-trigger hot reload
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'
import imagekitPlugin from "payloadcms-plugin-imagekit"

import { Media } from './payload/collections/Media'
import { LearningReasons } from './payload/collections/LearningReasons'
import { JourneyPhases } from './payload/collections/JourneyPhases'
import { GalleryItems } from './payload/collections/GalleryItems'
import { Testimonials } from './payload/collections/Testimonials'
import { FAQs } from './payload/collections/FAQs'
import { Volunteers } from './payload/collections/Volunteers'
import { Users } from './payload/collections/Users'

import { Hero } from './payload/globals/Hero'
import { Method } from './payload/globals/Method'
import { Week } from './payload/globals/Week'
import { Story } from './payload/globals/Story'
import { CTA } from './payload/globals/CTA'
import { Nav } from './payload/globals/Nav'

export default buildConfig({
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
      collections: ['learning-reasons', 'journey-phases', 'gallery-items', 'testimonials', 'faqs', 'volunteers'],
      globals: ['nav', 'hero', 'method', 'week', 'story', 'cta'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),

  collections: [
    Media,
    LearningReasons,
    JourneyPhases,
    GalleryItems,
    Testimonials,
    FAQs,
    Volunteers,
    Users,
  ],

  globals: [
    Nav,
    Hero,
    Method,
    Week,
    Story,
    CTA,
  ],

  plugins: [
    imagekitPlugin({
      config: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "your_public_api_key",
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "your_private_api_key",
        endpoint: process.env.IMAGEKIT_ENDPOINT || "https://ik.imagekit.io/your_imagekit_id/",
      },
      collections: {
        media: {
          uploadOption: {
            folder: "english_homestay_media",
            extensions: [
              {
                name: "aws-auto-tagging",
                minConfidence: 80, // only tags with a confidence value higher than 80% will be attached
                maxTags: 10, // a maximum of 10 tags from aws will be attached
              },
              {
                name: "google-auto-tagging",
                minConfidence: 70, // only tags with a confidence value higher than 70% will be attached
                maxTags: 10, // a maximum of 10 tags from google will be attached
              },
            ],
          },
          savedProperties: ["url", "AITags"],
        },
      },
    })
  ],

  secret: process.env.PAYLOAD_SECRET || 'SECRET_KEY',
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    }
  }),
  
  sharp,
})
