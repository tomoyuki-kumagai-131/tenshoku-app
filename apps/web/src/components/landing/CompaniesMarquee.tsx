'use client';

import { companies } from '@/data/landing';

export function CompaniesMarquee() {
  const reversedCompanies = [...companies].reverse();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            信頼の実績
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            500社以上の優良企業が利用中
          </h3>
          <p className="text-gray-600">業界をリードする企業がTenShokuで採用活動を行っています</p>
        </div>
      </div>

      {/* First Row - Left to Right */}
      <MarqueeRow companies={companies} direction="left" bgColor="from-white" />

      {/* Second Row - Right to Left (Reverse) */}
      <div className="mt-6">
        <MarqueeRow companies={reversedCompanies} direction="right" bgColor="from-gray-50" />
      </div>
    </section>
  );
}

interface MarqueeRowProps {
  companies: typeof import('@/data/landing').companies;
  direction: 'left' | 'right';
  bgColor: string;
}

function MarqueeRow({ companies, direction, bgColor }: MarqueeRowProps) {
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div className="relative">
      {/* Gradient Overlays */}
      <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r ${bgColor} to-transparent z-10`}></div>
      <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l ${bgColor} to-transparent z-10`}></div>

      {/* Marquee Container */}
      <div className={`flex ${animationClass}`}>
        {/* First set of companies */}
        <div className="flex items-center gap-8 px-4">
          {companies.map((company, i) => (
            <CompanyCard key={`first-${i}`} company={company} />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-8 px-4">
          {companies.map((company, i) => (
            <CompanyCard key={`second-${i}`} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CompanyCardProps {
  company: {
    name: string;
    logo: string;
    color: string;
  };
}

function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group flex-shrink-0 border border-gray-100">
      <div
        className={`w-10 h-10 bg-gradient-to-br ${company.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all`}
      >
        <span className="text-white font-bold">{company.logo}</span>
      </div>
      <span className="text-gray-700 font-medium whitespace-nowrap">{company.name}</span>
    </div>
  );
}
