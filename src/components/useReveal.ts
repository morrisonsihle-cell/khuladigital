'use client';

import { RefObject, useEffect } from 'react';

/** Adds `.animate` to every `.animate-on-scroll` element inside the section once it scrolls into view. */
export function useReveal(ref: RefObject<HTMLElement | null>, threshold = 0.05) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll('.animate-on-scroll'));
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('animate'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px 40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref, threshold]);
}
