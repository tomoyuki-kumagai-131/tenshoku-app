'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animated counter component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function AboutPage() {
  const heroRef = useInView();
  const missionRef = useInView();
  const valuesRef = useInView();
  const howItWorksRef = useInView();
  const faqRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-400/20 rounded-full animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div ref={heroRef.ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className={`text-center transition-all duration-1000 ${heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-bounce-subtle">
              About TenShoku
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              転職を、もっと<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">スマート</span>に
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              TenShokuは、IT・Web業界で働くすべての人の
              キャリアアップを支援する転職マッチングサービスです。
            </p>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-particle"
              style={{
                left: `${15 + i * 15}%`,
                bottom: '10%',
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div ref={missionRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-200 ${missionRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                Our Mission
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                すべての人に、<br />最高の転職体験を
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                私たちは、転職活動における「無駄」を徹底的に排除し、
                求職者と企業の最適なマッチングを実現することを使命としています。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                テクノロジーの力を活用し、一人ひとりのスキルや希望に
                合った求人を提案することで、転職の成功率を高め、
                キャリアアップを支援します。
              </p>
            </div>
            <div className={`relative transition-all duration-1000 delay-400 ${missionRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary-100 rounded-full opacity-50 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-purple-100 rounded-full opacity-50 animate-pulse-slow animation-delay-2000"></div>
              <div className="relative bg-gradient-to-br from-gray-100 to-white rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: 10000, suffix: '+', label: '掲載求人数' },
                    { number: 50000, suffix: '+', label: '登録ユーザー' },
                    { number: 95, suffix: '%', label: '満足度' },
                    { number: 3000, suffix: '+', label: '転職成功' },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-2xl font-bold text-primary-600">
                        <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div ref={valuesRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${valuesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              私たちが大切にしていること
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: '精度の高いマッチング',
                description: 'AIと専門スタッフの力を組み合わせ、あなたに最適な求人をご紹介します。',
                color: 'from-red-500 to-orange-500',
              },
              {
                icon: '⚡',
                title: 'スピード感',
                description: '登録から応募まで最短1分。忙しいあなたの時間を大切にします。',
                color: 'from-yellow-500 to-amber-500',
              },
              {
                icon: '🤝',
                title: '寄り添うサポート',
                description: '転職は人生の大きな決断。私たちは最後まで寄り添います。',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: '🔒',
                title: 'プライバシー保護',
                description: 'お預かりした情報は厳重に管理。安心してご利用いただけます。',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '📈',
                title: 'キャリアアップ支援',
                description: '年収アップ、スキルアップ。あなたの成長を全力でサポートします。',
                color: 'from-purple-500 to-violet-500',
              },
              {
                icon: '🌐',
                title: '最新の市場情報',
                description: 'IT業界の最新動向をキャッチし、価値ある情報をお届けします。',
                color: 'from-pink-500 to-rose-500',
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  valuesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div ref={howItWorksRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${howItWorksRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              TenShokuの使い方
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              3つのステップで簡単に転職活動を始められます
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {[
              {
                step: '01',
                title: '無料会員登録',
                description: 'メールアドレスとパスワードを入力するだけ。1分で登録完了。すぐに求人検索を開始できます。',
                image: 'https://picsum.photos/seed/step1/600/400',
              },
              {
                step: '02',
                title: 'プロフィール設定',
                description: 'スキル、経験、希望条件を入力。詳しく入力するほど、マッチング精度が向上します。',
                image: 'https://picsum.photos/seed/step2/600/400',
              },
              {
                step: '03',
                title: '求人検索・応募',
                description: '厳選された求人から気になるものを見つけて、ワンクリックで応募。プロフィール情報が自動入力されます。',
                image: 'https://picsum.photos/seed/step3/600/400',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                  howItWorksRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center gap-4 mb-6">
                    <span className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg animate-float">
                      {item.step}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  {index === 0 && (
                    <Link
                      href="/login"
                      className="group inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-primary-500/30"
                    >
                      今すぐ登録する
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-purple-100 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="relative rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow"
                    />
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-lg rotate-12 opacity-80"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-80"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div ref={faqRef.ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${faqRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              FAQ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              よくある質問
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                question: '利用料金はかかりますか？',
                answer: 'いいえ、求職者の方は完全無料でご利用いただけます。登録、求人検索、応募まですべて無料です。',
              },
              {
                question: '在職中でも利用できますか？',
                answer: 'はい、もちろんです。多くの方が在職中に転職活動を行っています。企業への情報公開設定も細かく調整できます。',
              },
              {
                question: 'どのような求人がありますか？',
                answer: 'IT・Web業界を中心に、エンジニア、デザイナー、マーケター、PM/PMOなど幅広い職種の求人を掲載しています。',
              },
              {
                question: '応募後の流れはどうなりますか？',
                answer: '応募後、企業から直接連絡があります。書類選考、面接と進み、内定まで私たちがサポートします。',
              },
              {
                question: '退会はできますか？',
                answer: 'はい、いつでも退会可能です。マイページから簡単に手続きできます。登録情報はすべて削除されます。',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className={`group bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md ${
                  faqRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-open:bg-primary-100 transition-colors flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-primary-600 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 animate-fade-in">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>

        {/* Animated stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div ref={ctaRef.ref} className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${ctaRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            理想の転職を、<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-pink-400">今すぐ</span>始めよう
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            10,000件以上の求人があなたを待っています。
            無料登録は1分で完了します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold text-lg py-4 px-8 rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1"
            >
              無料で登録する
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-lg py-4 px-8 rounded-xl hover:bg-white/20 transition-all hover:-translate-y-1"
            >
              トップに戻る
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-white">TenShoku</span>
            </div>
            <p className="text-sm">
              &copy; 2024 TenShoku. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
