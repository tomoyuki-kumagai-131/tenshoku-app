import Link from 'next/link';
import type { Job } from '@tenshoku/types';

interface StickyJobBarProps {
  job: Job;
}

export default function StickyJobBar({ job }: StickyJobBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary-600">
              {job.company.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold truncate">{job.title}</h2>
            <p className="text-white/70 text-sm truncate">{job.company}</p>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-yellow-300 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.salary}
            </span>
          </div>

          <Link
            href={`/jobs/${job.id}`}
            className="hidden sm:flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            詳細
          </Link>
        </div>
      </div>
    </div>
  );
}
