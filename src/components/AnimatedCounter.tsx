import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number | string;
  duration?: number; // duration in seconds
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.2,
  prefix = "",
  suffix = "",
  className = "",
  decimals,
}) => {
  const numericValue = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^0-9.-]/g, "")) || 0;
  const numDecimals = decimals !== undefined ? decimals : (value.toString().split(".")[1] || "").length;

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      setCount(easedProgress * numericValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [numericValue, duration]);

  const formattedNumber = count.toLocaleString(undefined, {
    minimumFractionDigits: numDecimals,
    maximumFractionDigits: numDecimals,
  });

  return (
    <span className={`tabular-nums inline-block font-mono ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
