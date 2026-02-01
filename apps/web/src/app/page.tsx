'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useInView } from '@/hooks';
import { testimonials } from '@/data/landing';
import Header from '@/components/Header';
import {
  HeroSection,
  CompaniesMarquee,
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from '@/components/landing';
import { ScrollToTopButton } from '@/components/common';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 各セクションのinView状態
  const featuresSection = useInView(0.2);
  const stepsSection = useInView(0.2);
  const statsSection = useInView(0.3);
  const testimonialsSection = useInView(0.2);
  const ctaSection = useInView(0.2);

  // 認証済みの場合は求人ページへリダイレクト
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/jobs');
    }
  }, [isAuthenticated, router]);

  // ページロードアニメーション
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 口コミのオートスライド
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection isLoaded={isLoaded} />
      <CompaniesMarquee />
      <FeaturesSection ref={featuresSection.ref} isInView={featuresSection.isInView} />
      <HowItWorksSection ref={stepsSection.ref} isInView={stepsSection.isInView} />
      <StatsSection ref={statsSection.ref} isInView={statsSection.isInView} />
      <TestimonialsSection
        ref={testimonialsSection.ref}
        isInView={testimonialsSection.isInView}
        currentTestimonial={currentTestimonial}
        onSelectTestimonial={setCurrentTestimonial}
      />
      <CTASection ref={ctaSection.ref} isInView={ctaSection.isInView} />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
