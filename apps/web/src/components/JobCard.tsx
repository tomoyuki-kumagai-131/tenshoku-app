'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Job } from '@tenshoku/types';
import { favoriteApi } from '@/lib/api';

interface JobCardProps {
  job: Job;
  featured?: boolean;
  initialFavorite?: boolean;
  onFavoriteChange?: (jobId: string, isFavorite: boolean) => void;
}

export default function JobCard({ job, featured = false, initialFavorite = false, onFavoriteChange }: JobCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  // 日付から「新着」かどうかを判定（7日以内）
  const isNew = () => {
    const createdDate = new Date(job.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays < 7;
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    const wasNotFavorite = !isFavorite;

    setIsLoading(true);
    try {
      if (isFavorite) {
        const res = await favoriteApi.remove(job.id);
        if (res.success) {
          setIsFavorite(false);
          onFavoriteChange?.(job.id, false);
        }
      } else {
        const res = await favoriteApi.add(job.id);
        if (res.success) {
          setIsFavorite(true);
          onFavoriteChange?.(job.id, true);
          // Trigger animation only when adding to favorites
          setIsAnimating(true);
          setShowParticles(true);
          setTimeout(() => setIsAnimating(false), 500);
          setTimeout(() => setShowParticles(false), 700);
        }
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate random particles
  const particles = [
    { angle: 0, color: '#ef4444' },
    { angle: 45, color: '#f97316' },
    { angle: 90, color: '#ec4899' },
    { angle: 135, color: '#ef4444' },
    { angle: 180, color: '#f97316' },
    { angle: 225, color: '#ec4899' },
    { angle: 270, color: '#ef4444' },
    { angle: 315, color: '#f97316' },
  ];

  return (
    <Link
      href={`/jobs/${job.id}`}
      className={`group block bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? 'ring-2 ring-primary-500 shadow-xl shadow-primary-500/10'
          : 'shadow-md hover:shadow-xl'
      }`}
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={job.imageUrl}
          alt={job.company}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {job.employmentType}
          </span>
          {isNew() && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm animate-pulse">
              NEW
            </span>
          )}
        </div>

        {/* Company Logo Placeholder */}
        <div className="absolute bottom-3 left-3">
          <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-600">
              {job.company.charAt(0)}
            </span>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          ref={buttonRef}
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all group/btn ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-white/90 backdrop-blur-sm hover:bg-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {/* Burst effect */}
          {showParticles && (
            <span className="absolute inset-0 rounded-full bg-red-400 animate-heart-burst"></span>
          )}

          {/* Particles */}
          {showParticles && particles.map((particle, i) => (
            <span
              key={i}
              className="heart-particle"
              style={{
                backgroundColor: particle.color,
                transform: `rotate(${particle.angle}deg) translateY(-20px)`,
                animationDelay: `${i * 0.03}s`,
              }}
            />
          ))}

          <svg
            className={`w-5 h-5 transition-all ${
              isFavorite ? 'text-white' : 'text-gray-400 group-hover/btn:text-red-500'
            } ${isAnimating ? 'animate-heart-pop' : ''}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title & Company */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-gray-500 text-sm font-medium">{job.company}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-primary-600 truncate">{job.salary.split('〜')[0]}〜</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-gray-400 text-xs font-medium px-2 py-1">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {new Date(job.createdAt).toLocaleDateString('ja-JP')} 掲載
          </span>
          <span className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
            詳細を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
