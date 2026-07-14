'use client';

import React, { useState } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { submitContactForm } from '@/app/actions';

export function Contact({ data }: { data?: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const res = await submitContactForm(formData);
    
    if (res.success) {
      setStatus('success');
    } else {
      setStatus('idle');
      alert(res.error || "Something went wrong.");
    }
  }

  const headline = data?.headline || "Your bridge to the world starts with one conversation.";
  const body = data?.body || "Tell us a bit about you, and our team will reach out to book your free trial class — no pressure, no obligation.";
  const ctaLabel = data?.primary_cta_label || "Book My Free Trial Class";

  return (
    <section id="contact" className="py-(--space-section)">
      <div className="max-w-[1180px] mx-auto px-(--space-gutter)">
        <FadeIn>
          <div className="max-w-[640px] mb-(--space-lg)">
            <span className="eyebrow t-label-sm">Get started</span>
            <h2 className="t-lg">{headline}</h2>
            <p className="t-body-md muted" style={{ marginTop: '10px' }}>
              {body}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 gap-(--space-xl) items-start max-[860px]:grid-cols-1 max-[860px]:gap-(--space-md)">
            
            {/* Form Column */}
            <div>
              {status !== 'success' ? (
                <form onSubmit={handleSubmit} className="card p-[24px]">
                  <div className="mb-[16px]">
                    <label htmlFor="cf-name" className="block text-[13px] font-semibold mb-[6px]">Full name</label>
                    <input 
                      type="text" 
                      id="cf-name" 
                      name="name" 
                      placeholder="Your name" 
                      className="w-full border border-(--color-border) bg-(--color-surface) rounded-(--radius-md) py-[12px] px-[14px] text-[15px] font-[inherit] text-(--color-on-surface) focus:outline focus:outline-[2px] focus:outline-(--color-primary) focus:outline-offset-[1px]"
                      required 
                    />
                  </div>
                  <div className="mb-[16px]">
                    <label htmlFor="cf-phone" className="block text-[13px] font-semibold mb-[6px]">Phone number</label>
                    <input 
                      type="tel" 
                      id="cf-phone" 
                      name="phone" 
                      placeholder="e.g. 090 123 4567" 
                      className="w-full border border-(--color-border) bg-(--color-surface) rounded-(--radius-md) py-[12px] px-[14px] text-[15px] font-[inherit] text-(--color-on-surface) focus:outline focus:outline-[2px] focus:outline-(--color-primary) focus:outline-offset-[1px]"
                      required 
                    />
                  </div>
                  <div className="mb-[16px]">
                    <label htmlFor="cf-level" className="block text-[13px] font-semibold mb-[6px]">Current English level</label>
                    <select 
                      id="cf-level" 
                      name="level" 
                      className="w-full border border-(--color-border) bg-(--color-surface) rounded-(--radius-md) py-[12px] px-[14px] text-[15px] font-[inherit] text-(--color-on-surface) focus:outline focus:outline-[2px] focus:outline-(--color-primary) focus:outline-offset-[1px]"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Select your level</option>
                      <option>Beginner</option>
                      <option>Elementary</option>
                      <option>Intermediate</option>
                      <option>Upper-Intermediate</option>
                      <option>Advanced</option>
                      <option>Not sure — I'd like a placement test</option>
                    </select>
                  </div>
                  <div className="mb-[16px]">
                    <label htmlFor="cf-goal" className="block text-[13px] font-semibold mb-[6px]">Learning goal</label>
                    <select 
                      id="cf-goal" 
                      name="goal" 
                      className="w-full border border-(--color-border) bg-(--color-surface) rounded-(--radius-md) py-[12px] px-[14px] text-[15px] font-[inherit] text-(--color-on-surface) focus:outline focus:outline-[2px] focus:outline-(--color-primary) focus:outline-offset-[1px]"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>What's your main goal?</option>
                      <option>Career growth</option>
                      <option>Traveling</option>
                      <option>Studying abroad</option>
                      <option>Working internationally</option>
                      <option>Communicating with foreigners</option>
                      <option>Supporting my children</option>
                      <option>Building confidence</option>
                      <option>Personal interest</option>
                    </select>
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full disabled:opacity-[0.55] disabled:cursor-not-allowed">
                    {status === 'submitting' ? 'Booking...' : ctaLabel}
                  </button>
                  <p className="text-[12px] text-(--color-muted) mt-[10px]">
                    By submitting, you agree to be contacted by our team about your free trial class. No spam, ever.
                  </p>
                </form>
              ) : (
                <div className="text-center px-[20px] py-[40px] card">
                  <p className="t-sm">Thanks — you're in! 🎉</p>
                  <p className="t-body-md muted" style={{ marginTop: '10px' }}>
                    Our team will reach out shortly to book your free trial class.
                  </p>
                </div>
              )}
            </div>

            {/* Perks Column */}
            <div className="flex flex-col gap-[18px]">
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">A free trial class with a real qualified teacher and international volunteers — see the method for yourself.</p>
              </div>
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">A free placement test, so we can recommend the right starting point for you.</p>
              </div>
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">No pressure, no obligation — just a conversation about your goals.</p>
              </div>
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">Our team typically responds within one business day.</p>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
