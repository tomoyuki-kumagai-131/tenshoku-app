'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { jobApi, favoriteApi, PaginatedJobsResponse } from '@/lib/api';
import Header from '@/components/Header';
import JobCard from '@/components/JobCard';
import { ScrollToTopButton } from '@/components/common';
import type { Job } from '@tenshoku/types';

// Popular skills for quick filter
const POPULAR_SKILLS = [
  'React', 'TypeScript', 'Python', 'AWS', 'Go', 'Node.js', 'Kubernetes', 'Docker', 'Java', 'Flutter'
];

export default function JobsPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'recommended' | 'newest'>('recommended');
  const [pagination, setPagination] = useState<PaginatedJobsResponse['pagination'] | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const locations = ['all', '東京', '大阪', '福岡', 'フルリモート', '神奈川', '京都', '愛知', '北海道'];

  const fetchJobs = useCallback(async (page: number, reset: boolean = false) => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const res = await jobApi.getAll({
        page,
        limit: 9,
        search: searchQuery,
        location: selectedLocation === 'all' ? '' : selectedLocation,
        skills: selectedSkills,
        sort: sortOrder,
      });

      if (res.success && res.data) {
        if (reset || page === 1) {
          setJobs(res.data.jobs);
        } else {
          setJobs((prev) => [...prev, ...res.data!.jobs]);
        }
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchQuery, selectedLocation, selectedSkills, sortOrder]);

  // お気に入り一覧を取得
  const fetchFavorites = useCallback(async () => {
    try {
      const res = await favoriteApi.getAll();
      if (res.success && res.data) {
        setFavoriteIds(new Set(res.data.map((fav) => fav.jobId)));
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  }, []);

  // 初回読み込みとフィルター変更時
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchJobs(1, true);
    fetchFavorites();
  }, [isAuthenticated, router, fetchJobs, fetchFavorites]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination?.hasMore && !isLoadingMore && !isLoading) {
          fetchJobs(pagination.page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pagination, isLoadingMore, isLoading, fetchJobs]);

  // 検索実行
  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Enterキーで検索
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // フィルタークリア
  const handleClearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedSkills([]);
    setSortOrder('recommended');
  };

  // スキルトグル
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // お気に入り状態変更時のハンドラ
  const handleFavoriteChange = (jobId: string, isFavorite: boolean) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(jobId);
      } else {
        newSet.delete(jobId);
      }
      return newSet;
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {user?.name ? `${user.name}さん、` : ''}理想の求人を見つけよう
            </h1>
            <p className="text-primary-100 text-lg">
              厳選された{pagination?.total || 0}件の求人からあなたにぴったりの仕事を探しましょう
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="職種、会社名で検索..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full sm:w-44 px-4 py-4 rounded-xl border-0 bg-gray-50 focus:ring-2 focus:ring-primary-500 text-gray-900 appearance-none cursor-pointer"
                  >
                    <option value="all">全国</option>
                    {locations.slice(1).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <button
                  onClick={handleSearch}
                  className="sm:w-auto px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
                >
                  検索
                </button>
              </div>
            </div>

            {/* Skill Filter */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary-100 text-sm font-medium">スキルで絞り込み:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-white text-primary-700 shadow-md'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <span className="ml-1.5">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">{pagination?.total || 0}</span> 件の求人
                </span>
              </div>
              {(searchQuery || selectedLocation !== 'all' || selectedSkills.length > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  フィルターをクリア
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              {/* Sort Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSortOrder('recommended')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    sortOrder === 'recommended'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  おすすめ
                </button>
                <button
                  onClick={() => setSortOrder('newest')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    sortOrder === 'newest'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  新着順
                </button>
              </div>
              {/* Active Filters */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                {searchQuery && (
                  <span>「{searchQuery}」</span>
                )}
                {selectedLocation !== 'all' && (
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                    {selectedLocation}
                  </span>
                )}
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => handleSkillToggle(skill)}
                      className="hover:text-primary-900"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-500">求人を読み込み中...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">求人が見つかりませんでした</h3>
            <p className="text-gray-500 mb-6">検索条件を変更してお試しください</p>
            <button
              onClick={handleClearFilters}
              className="btn-primary"
            >
              条件をクリア
            </button>
          </div>
        ) : (
          <>
            {/* All Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {searchQuery || selectedLocation !== 'all' || selectedSkills.length > 0 ? '検索結果' : '求人一覧'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {pagination?.total || 0}件中 {jobs.length}件を表示
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    {sortOrder === 'recommended' ? (
                      <>
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        おすすめ順
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        新着順
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                  <JobCard
                    key={`${job.id}-${index}`}
                    job={job}
                    featured={index < 2 && !searchQuery && selectedLocation === 'all' && selectedSkills.length === 0}
                    initialFavorite={favoriteIds.has(job.id)}
                    onFavoriteChange={handleFavoriteChange}
                  />
                ))}
              </div>

              {/* Load More Trigger */}
              <div ref={loadMoreRef} className="py-8">
                {isLoadingMore && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative">
                      <div className="w-10 h-10 border-4 border-primary-200 rounded-full"></div>
                      <div className="w-10 h-10 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">さらに読み込み中...</p>
                  </div>
                )}
                {pagination && !pagination.hasMore && jobs.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">すべての求人を表示しました</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                希望の求人が見つからない？
              </h3>
              <p className="text-gray-400">
                プロフィールを充実させると、企業からスカウトが届くことも
              </p>
            </div>
            <button
              onClick={() => router.push('/mypage')}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              プロフィールを編集
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
