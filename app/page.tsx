import React from 'react';
import { Hero } from '../components/sections/Hero';
import { WhyEnglish } from '../components/sections/WhyEnglish';
import { Story } from '../components/sections/Story';
import { Method } from '../components/sections/Method';
import { Journey } from '../components/sections/Journey';
import { Week } from '../components/sections/Week';
import { Gallery } from '../components/sections/Gallery';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import { Nav } from '@/components/sections/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <WhyEnglish />
      <Story />
      <Method />
      <Journey />
      <Week />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}