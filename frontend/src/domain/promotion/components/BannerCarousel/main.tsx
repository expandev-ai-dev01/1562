import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { BannerCarouselProps } from './types';
import { getCarouselClassName, getIndicatorClassName } from './variants';

export const BannerCarousel = ({ banners, isLoading = false, className }: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (banners.length === 0 || isPaused) return;

    const transitionTime = banners[currentIndex]?.transitionTime || 5;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, transitionTime * 1000);

    return () => clearInterval(interval);
  }, [currentIndex, banners, isPaused]);

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (banners.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentBanner = banners[currentIndex];

  return (
    <div
      className={getCarouselClassName({ className })}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <a href={currentBanner.destinationUrl} className="block relative">
        <img
          src={currentBanner.imageUrl}
          alt={currentBanner.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{currentBanner.title}</h2>
          {currentBanner.subtitle && (
            <p className="text-lg md:text-xl text-white">{currentBanner.subtitle}</p>
          )}
        </div>
      </a>

      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 transition-colors"
            aria-label="Banner anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 transition-colors"
            aria-label="Próximo banner"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={getIndicatorClassName({ isActive: index === currentIndex })}
                aria-label={`Ir para banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
