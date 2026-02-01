'use client';

import { forwardRef } from 'react';
import { features } from '@/data/landing';

interface FeaturesSectionProps {
  isInView: boolean;
}

export const FeaturesSection = forwardRef<HTMLElement, FeaturesSectionProps>(
  function FeaturesSection({ isInView }, ref) {
    return (
      <section id="features" className="py-24 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 animate-bounce-subtle">
              なぜTenShoku？
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              TenShokuが選ばれる理由
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              転職活動をもっとスマートに。私たちは最高の転職体験を提供します。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

interface FeatureCardProps {
  feature: (typeof features)[number];
  index: number;
  isInView: boolean;
}

function FeatureCard({ feature, index, isInView }: FeatureCardProps) {
  const strokeColor = feature.color.includes('blue') ? '#3b82f6'
    : feature.color.includes('purple') ? '#a855f7'
    : '#f97316';

  return (
    <div
      className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}
      ></div>
      <div
        className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke={strokeColor}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.iconPath} />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );
}
