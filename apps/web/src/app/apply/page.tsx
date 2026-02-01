'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { jobApi } from '@/lib/api';
import Header from '@/components/Header';
import ApplicationComplete from '@/components/ApplicationComplete';
import {
  StickyJobBar,
  JobHeroSection,
  ApplicationSteps,
  ApplicationForm,
  ApplicationSidebar,
} from '@/components/apply';
import type { Job } from '@tenshoku/types';

function ApplyFormContainer() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');

  const [job, setJob] = useState<Job | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Calculate current step based on filled fields
  const currentStep = (() => {
    const { name, phone, address, message } = formData;
    if (name && phone && address) return message ? 3 : 2;
    if (name || phone || address) return 2;
    return 1;
  })();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        message: '',
      });
    }

    if (jobId) {
      jobApi.getById(jobId).then((res) => {
        if (res.success && res.data) {
          setJob(res.data);
        }
        setIsLoadingJob(false);
      });
    } else {
      setIsLoadingJob(false);
    }
  }, [isAuthenticated, router, user, jobId]);

  const handleFormChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await jobApi.apply(jobId, formData);
      if (res.success) {
        window.scrollTo(0, 0);
        setIsSubmitted(true);
      } else {
        setError(res.error || '応募に失敗しました');
      }
    } catch {
      setError('応募に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoadingJob) {
    return <LoadingSpinner message="求人情報を読み込み中..." />;
  }

  if (!job) {
    return <JobNotFound />;
  }

  if (isSubmitted) {
    return <ApplicationComplete job={job} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <StickyJobBar job={job} />
      <JobHeroSection job={job} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ApplicationSteps currentStep={currentStep} />
            <ApplicationForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
            />
          </div>
          <ApplicationSidebar job={job} />
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-500">{message}</p>
    </div>
  );
}

function JobNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">求人が見つかりません</h1>
      <Link href="/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
        求人一覧に戻る
      </Link>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingSpinner message="読み込み中..." />}>
        <ApplyFormContainer />
      </Suspense>
    </div>
  );
}
