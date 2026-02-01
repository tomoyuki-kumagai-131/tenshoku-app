'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

interface CTASectionProps {
  isInView: boolean;
}

export const CTASection = forwardRef<HTMLElement, CTASectionProps>(function CTASection(
  { isInView },
  ref
) {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      <div
        className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          さあ、新しいキャリアを
          <br />
          始めましょう
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          無料登録は1分で完了。あなたにぴったりの求人情報をお届けします。
        </p>
        <Link
          href="/login"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white font-bold text-xl py-5 px-12 rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all animate-glow"
        >
          無料で登録する
          <svg
            className="w-6 h-6 group-hover:translate-x-2 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
        <p className="mt-6 text-sm text-gray-500">クレジットカード不要 • いつでも退会可能</p>
      </div>
    </section>
  );
});
