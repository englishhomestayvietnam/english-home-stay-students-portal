import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { Hero } from '@/components/sections/Hero';
import { WhyEnglish } from '@/components/sections/WhyEnglish';
import { Story } from '@/components/sections/Story';
import { Method } from '@/components/sections/Method';
import { Journey } from '@/components/sections/Journey';
import { Week } from '@/components/sections/Week';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Nav } from '@/components/sections/Nav';

export default async function Home() {
  const payload = await getPayload({ config });

  // Fetch all data concurrently
  const [
    hero,
    method,
    week,
    story,
    cta,
    reasonsRes,
    journeyRes,
    galleryRes,
    testRes,
    faqRes
  ] = await Promise.all([
    payload.findGlobal({ slug: 'hero', depth: 1 }),
    payload.findGlobal({ slug: 'method', depth: 1 }),
    payload.findGlobal({ slug: 'week', depth: 1 }),
    payload.findGlobal({ slug: 'story', depth: 1 }),
    payload.findGlobal({ slug: 'cta', depth: 1 }),
    payload.find({ collection: 'learning-reasons', limit: 100, depth: 1 }),
    payload.find({ collection: 'journey-phases', limit: 100, depth: 1 }),
    payload.find({ collection: 'gallery-items', limit: 100, depth: 1 }),
    payload.find({ collection: 'testimonials', limit: 100, depth: 1 }),
    payload.find({ collection: 'faqs', limit: 100, depth: 1 }),
  ]);

  return (
    <>
      <Nav />
      <Hero data={hero} />
      <WhyEnglish data={reasonsRes.docs} />
      <Story data={story} />
      <Method data={method} />
      <Journey data={journeyRes.docs} />
      <Week data={week} methodData={method} />
      <Gallery data={galleryRes.docs} />
      <Testimonials data={testRes.docs} />
      <FAQ data={faqRes.docs} />
      <Contact data={cta} />
      <Footer />
    </>
  );
}