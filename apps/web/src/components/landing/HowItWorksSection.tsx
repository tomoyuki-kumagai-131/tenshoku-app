'use client';

import { forwardRef } from 'react';
import { steps } from '@/data/landing';

interface HowItWorksSectionProps {
  isInView: boolean;
}

export const HowItWorksSection = forwardRef<HTMLElement, HowItWorksSectionProps>(
  function HowItWorksSection({ isInView }, ref) {
    return (
      <section className="py-24 bg-gray-50" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              簡単3ステップ
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">ご利用の流れ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div
              className={`hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-300 via-purple-300 to-pink-300 transition-all duration-1000 delay-500 origin-left ${isInView ? 'scale-x-100' : 'scale-x-0'}`}
            ></div>

            {steps.map((item, index) => (
              <StepCard key={index} item={item} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

interface StepCardProps {
  item: (typeof steps)[number];
  index: number;
  isInView: boolean;
}

function StepCard({ item, index, isInView }: StepCardProps) {
  return (
    <div
      className={`relative text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 200 + 300}ms` }}
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg relative z-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg animate-bounce-subtle">
          {item.icon}
        </div>
        <div className="text-sm font-bold text-primary-600 mb-2">STEP {item.step}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
        <p className="text-gray-600">{item.desc}</p>
      </div>
    </div>
  );
}
