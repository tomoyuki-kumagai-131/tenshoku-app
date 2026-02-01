'use client';

import Link from 'next/link';
import type { Job } from '@tenshoku/types';

interface ApplicationCompleteProps {
  job: Job;
}

export default function ApplicationComplete({ job }: ApplicationCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-yellow-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Confetti */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 animate-confetti"
            style={{
              left: `${5 + (i * 4.5)}%`,
              top: '-20px',
              animationDelay: `${i * 0.15}s`,
              backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'][i % 6],
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
              transform: i % 2 === 0 ? 'rotate(45deg)' : 'none',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center mb-8">
          {/* Animated checkmark */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-green-200 animate-success-ring"></div>
            <div className="absolute inset-0 rounded-full bg-green-200 animate-success-ring" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute inset-0 rounded-full bg-green-200 animate-success-ring" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-checkmark-circle shadow-xl shadow-green-500/40"></div>
            <svg
              className="absolute inset-0 w-28 h-28 animate-checkmark-scale"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                className="animate-checkmark-check"
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            応募が完了しました！
          </h1>
          <p className="text-gray-500 text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            ご応募ありがとうございます
          </p>

          {/* Job Summary Card */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary-600">
                  {job.company.charAt(0)}
                </span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="text-primary-600 font-medium">{job.salary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <Timeline />

          {/* Notice */}
          <NoticeCard />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              他の求人を探す
            </Link>
            <Link
              href="/mypage"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              マイページ
            </Link>
          </div>
        </div>

        {/* Additional Actions */}
        <AdditionalActions jobId={job.id} />
      </div>
    </div>
  );
}

function Timeline() {
  const steps = [
    {
      status: 'complete',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: '応募完了',
      description: 'あなたの応募が企業に送信されました',
    },
    {
      status: 'current',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: '書類選考',
      description: '企業が応募内容を確認中です',
    },
    {
      status: 'pending',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: '企業からの連絡',
      description: '通常1週間以内にメールまたは電話でご連絡します',
    },
  ];

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-primary-100 text-primary-600';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="text-left mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
      <h3 className="font-bold text-gray-900 mb-4 text-center">今後の流れ</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepStyles(step.status)}`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              )}
            </div>
            <div className={index < steps.length - 1 ? 'pb-6' : ''}>
              <p className="font-medium text-gray-900">{step.title}</p>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticeCard() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-left text-sm">
          <p className="font-medium text-blue-800">通知をお見逃しなく</p>
          <p className="text-blue-600">企業からの連絡はアプリ内通知とメールでお知らせします。通知設定をご確認ください。</p>
        </div>
      </div>
    </div>
  );
}

function AdditionalActions({ jobId }: { jobId: string }) {
  const actions = [
    {
      href: '/mypage?tab=favorites',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      iconBg: 'bg-red-100',
      title: 'お気に入り求人',
      description: '保存した求人を確認',
    },
    {
      href: `/jobs/${jobId}`,
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: 'bg-primary-100',
      title: '応募した求人',
      description: '求人詳細をもう一度見る',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '1.1s' }}>
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <div>
              <p className="font-bold text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
