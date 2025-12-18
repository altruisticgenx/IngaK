import { useEffect, useRef } from 'react';

/**
 * Custom hook for observing section visibility using IntersectionObserver.
 * Replaces debounce-based scroll spy with browser-native performance optimization.
 * 
 * @param callback - Function called when a section becomes active
 * @param sections - Array of section IDs to observe
 * @param options - IntersectionObserver options
 */
export function useIntersectionObserver(
  callback: (id: string) => void,
  sections: readonly string[],
  options?: {
    rootMargin?: string;
    threshold?: number | number[];
  }
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated to avoid stale closures
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Root margin accounts for fixed header (72px) and triggers intersection
    // when section is in upper third of viewport
    const rootMargin = options?.rootMargin ?? '-72px 0px -60% 0px';
    const threshold = options?.threshold ?? 0;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting and closest to the top
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          callbackRef.current(intersecting[0].target.id);
        }
      },
      { rootMargin, threshold }
    );

    observerRef.current = observer;

    // Observe all sections
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, options?.rootMargin, options?.threshold]);

  return observerRef;
}

export default useIntersectionObserver;

