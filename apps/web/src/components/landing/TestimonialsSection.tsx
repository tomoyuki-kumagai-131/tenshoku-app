'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { testimonials } from '@/data/landing';

interface TestimonialsSectionProps {
  isInView: boolean;
  currentTestimonial: number;
  onSelectTestimonial: (index: number) => void;
}

export const TestimonialsSection = forwardRef<HTMLElement, TestimonialsSectionProps>(
  function TestimonialsSection({ isInView, currentTestimonial, onSelectTestimonial }, ref) {
    const testimonial = testimonials[currentTestimonial];

    return (
      <section className="py-24 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              利用者の声
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">転職成功者の声</h2>
          </div>

          <div
            className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <svg
                className="w-12 h-12 text-primary-200 mb-6 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p
                className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed animate-fade-in"
                key={currentTestimonial}
              >
                {testimonial.text}
              </p>
              <div
                className="flex items-center gap-4 animate-fade-in"
                key={`author-${currentTestimonial}`}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full ring-4 ring-primary-100"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-sm text-primary-600">{testimonial.company}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onSelectTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
