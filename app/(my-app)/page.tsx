import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';

// Revalidate the page every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60;

import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { WhyEnglish } from '@/components/sections/WhyEnglish';
import { WhoIsThisFor } from '@/components/sections/WhoIsThisFor';
import { Story } from '@/components/sections/Story';
import { Method } from '@/components/sections/Method';
import { Journey } from '@/components/sections/Journey';
import { Week } from '@/components/sections/Week';
import { Volunteers } from '@/components/sections/Volunteers';
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
    nav,
    hero,
    method,
    week,
    story,
    cta,
    reasonsRes,
    journeyRes,
    galleryRes,
    testRes,
    faqRes,
    volunteersRes
  ] = await Promise.all([
    payload.findGlobal({ slug: 'nav', depth: 1 }),
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
    payload.find({ collection: 'volunteers', limit: 100, depth: 1 }),
  ]);

  return (
    <>
      <Nav data={nav} />
      <Hero data={hero} />
      <Stats />
      <WhyEnglish data={reasonsRes.docs} />
      <WhoIsThisFor />
      <Story data={story} />
      <Method data={method} />
      <Journey data={journeyRes.docs} />
      <Week data={week} />
      <Volunteers data={volunteersRes.docs} />
      <Gallery data={galleryRes.docs} />
      <Testimonials data={testRes.docs} />
      <FAQ data={faqRes.docs} />
      <Contact data={cta} />
      <Footer />
    </>
  );
}