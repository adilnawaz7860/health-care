import React, { useEffect, useState, useRef } from 'react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number; // in milliseconds
}

export const StatCounter: React.FC<StatCounterProps> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother deceleration
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(start + easeOutQuad(progress) * (end - start));
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef} className="font-mono tabular-nums">
      {count}
      {suffix}
    </span>
  );
};
