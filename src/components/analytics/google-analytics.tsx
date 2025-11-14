"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4 setup
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Custom event tracking
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// Conversion tracking
export function trackConversion(toolType: string, fileFormat: string, fileSize?: number) {
  trackEvent('file_conversion', {
    tool_type: toolType,
    file_format: fileFormat,
    file_size: fileSize,
    conversion_timestamp: new Date().toISOString(),
  });
}

// User engagement tracking
export function trackUserEngagement(action: string, details?: Record<string, any>) {
  trackEvent('user_engagement', {
    action,
    ...details,
    timestamp: new Date().toISOString(),
  });
}

// Performance tracking
export function trackPerformance(metric: string, value: number, toolType?: string) {
  trackEvent('performance_metric', {
    metric_name: metric,
    metric_value: value,
    tool_type: toolType,
    timestamp: new Date().toISOString(),
  });
}

// Error tracking
export function trackError(error: string, context?: Record<string, any>) {
  trackEvent('error_occurred', {
    error_message: error,
    ...context,
    timestamp: new Date().toISOString(),
  });
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

