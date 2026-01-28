import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  AbsoluteFill,
} from "remotion";
import { brand } from "../brand";

type StatItem = {
  label: string;
  value: string;
  icon?: string;
};

type StatsPopupProps = {
  stat: StatItem;
  position?: "left" | "right" | "center";
  variant?: "pill" | "card" | "minimal";
};

export const StatsPopup: React.FC<StatsPopupProps> = ({
  stat,
  position = "right",
  variant = "pill",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrance animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Position mapping
  const positionStyles: Record<string, React.CSSProperties> = {
    left: { left: 40, right: "auto" },
    right: { right: 40, left: "auto" },
    center: { left: "50%", transform: `translateX(-50%) scale(${scale})` },
  };

  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    pill: {
      background: `linear-gradient(135deg, ${brand.colors.primary} 0%, ${brand.colors.backgroundLight} 100%)`,
      borderRadius: 100,
      padding: "16px 32px",
      border: `2px solid ${brand.colors.secondary}`,
    },
    card: {
      background: brand.colors.backgroundLight,
      borderRadius: 20,
      padding: "24px 36px",
      border: `2px solid ${brand.colors.secondary}`,
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
    },
    minimal: {
      background: "rgba(0, 0, 0, 0.6)",
      borderRadius: 12,
      padding: "12px 24px",
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 200,
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: position !== "center" ? `scale(${scale})` : undefined,
        ...positionStyles[position],
        ...variantStyles[variant],
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: brand.fonts.body,
            fontSize: 24,
            fontWeight: 500,
            color: brand.colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {stat.label}
        </span>
        <span
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 48,
            fontWeight: 800,
            color: brand.colors.highlight,
          }}
        >
          {stat.value}
        </span>
      </div>
    </div>
  );
};

// Animated counter for stats
export const AnimatedStat: React.FC<{
  label: string;
  endValue: number;
  prefix?: string;
  suffix?: string;
  durationFrames?: number;
}> = ({ label, endValue, prefix = "", suffix = "", durationFrames = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: durationFrames,
  });

  const currentValue = Math.round(interpolate(progress, [0, 1], [0, endValue]));
  const scale = interpolate(progress, [0, 0.5, 1], [0.8, 1.1, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        transform: `scale(${scale})`,
      }}
    >
      <span
        style={{
          fontFamily: brand.fonts.heading,
          fontSize: 72,
          fontWeight: 800,
          color: brand.colors.highlight,
        }}
      >
        {prefix}
        {currentValue.toLocaleString()}
        {suffix}
      </span>
      <span
        style={{
          fontFamily: brand.fonts.body,
          fontSize: 28,
          fontWeight: 500,
          color: brand.colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// Multiple stats in a row
export const StatsRow: React.FC<{
  stats: Array<{ label: string; value: string }>;
  staggerDelay?: number;
}> = ({ stats, staggerDelay = 10 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 350,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {stats.map((stat, index) => {
        const entrance = spring({
          frame: frame - index * staggerDelay,
          fps,
          config: { damping: 15, stiffness: 150 },
        });

        const opacity = Math.max(0, interpolate(entrance, [0, 1], [0, 1]));
        const translateY = interpolate(entrance, [0, 1], [40, 0]);

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: brand.fonts.heading,
                fontSize: 44,
                fontWeight: 800,
                color: brand.colors.highlight,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: brand.fonts.body,
                fontSize: 20,
                fontWeight: 500,
                color: brand.colors.textMuted,
              }}
            >
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
