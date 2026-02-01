'use client';

import { forwardRef } from 'react';
import { stats } from '@/data/landing';
import { useCounter } from '@/hooks';

interface StatsSectionProps {
  isInView: boolean;
}

export const StatsSection = forwardRef<HTMLElement, StatsSectionProps>(function StatsSection(
  { isInView },
  ref
) {
  return (
    <section
      className="py-24 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse-slow animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
});

interface StatCardProps {
  stat: (typeof stats)[number];
  index: number;
  isInView: boolean;
}

function StatCard({ stat, index, isInView }: StatCardProps) {
  const count = useCounter(stat.number, 2000, isInView);

  return (
    <div
      className={`text-center transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="text-4xl mb-3 animate-bounce-subtle"
        style={{ animationDelay: `${index * 200}ms` }}
      >
        {stat.icon}
      </div>
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}
        <span className="text-3xl">{stat.suffix}</span>
      </div>
      <div className="text-white/80">{stat.label}</div>
    </div>
  );
}
