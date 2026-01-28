import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { brand } from "../brand";

type EndCardProps = {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  showStats?: boolean;
};

export const EndCard: React.FC<EndCardProps> = ({
  headline = "Start earning 9-12% returns",
  subheadline = "Invest in bonds with just ₹1,000",
  ctaText = brand.cta.primary,
  showStats = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered animations
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const headlineEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });

  const subheadlineEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });

  const ctaEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const statsEntrance = spring({
    frame: frame - 40,
    fps,
    config: { damping: 200 },
  });

  // CTA pulse animation
  const pulse = interpolate(
    (frame % 30) / 30,
    [0, 0.5, 1],
    [1, 1.05, 1]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, ${brand.colors.background} 0%, ${brand.colors.primary} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        padding: 60,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: interpolate(logoEntrance, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoEntrance, [0, 1], [0.5, 1])})`,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Elephant icon placeholder */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${brand.colors.secondary} 0%, ${brand.colors.accent} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: brand.fonts.heading,
            fontSize: 40,
            fontWeight: 800,
            color: brand.colors.primary,
          }}
        >
          W
        </div>

        <span
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 48,
            fontWeight: 700,
            color: brand.colors.text,
            letterSpacing: 2,
          }}
        >
          {brand.logoText}
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: interpolate(headlineEntrance, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headlineEntrance, [0, 1], [30, 0])}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 56,
            fontWeight: 800,
            color: brand.colors.text,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {headline}
        </h1>
      </div>

      {/* Subheadline */}
      <div
        style={{
          opacity: interpolate(subheadlineEntrance, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subheadlineEntrance, [0, 1], [20, 0])}px)`,
        }}
      >
        <p
          style={{
            fontFamily: brand.fonts.body,
            fontSize: 32,
            fontWeight: 500,
            color: brand.colors.textMuted,
            margin: 0,
            textAlign: "center",
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: interpolate(ctaEntrance, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaEntrance, [0, 1], [0.8, 1]) * pulse})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${brand.colors.secondary} 0%, ${brand.colors.accent} 100%)`,
            padding: "24px 64px",
            borderRadius: 100,
            boxShadow: `0 10px 40px ${brand.colors.secondary}50`,
          }}
        >
          <span
            style={{
              fontFamily: brand.fonts.heading,
              fontSize: 32,
              fontWeight: 700,
              color: brand.colors.primary,
            }}
          >
            {ctaText}
          </span>
        </div>
      </div>

      {/* Stats row */}
      {showStats && (
        <div
          style={{
            opacity: interpolate(statsEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(statsEntrance, [0, 1], [20, 0])}px)`,
            display: "flex",
            gap: 48,
            marginTop: 20,
          }}
        >
          {[
            { label: "Returns", value: brand.stats.returns },
            { label: "Min Investment", value: brand.stats.minInvestment },
            { label: "Investors", value: brand.stats.investors },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: brand.fonts.heading,
                  fontSize: 36,
                  fontWeight: 800,
                  color: brand.colors.highlight,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: brand.fonts.body,
                  fontSize: 18,
                  color: brand.colors.textMuted,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* App store text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: interpolate(statsEntrance, [0, 1], [0, 0.7]),
        }}
      >
        <span
          style={{
            fontFamily: brand.fonts.body,
            fontSize: 22,
            color: brand.colors.textMuted,
          }}
        >
          {brand.cta.appStore}
        </span>
      </div>
    </div>
  );
};

// Minimal end card for quick CTA
export const MinimalEndCard: React.FC<{
  text?: string;
}> = ({ text = "Download Wint Wealth" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${brand.colors.secondary} 0%, ${brand.colors.accent} 100%)`,
          padding: "20px 48px",
          borderRadius: 100,
          boxShadow: `0 8px 30px ${brand.colors.secondary}40`,
        }}
      >
        <span
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 28,
            fontWeight: 700,
            color: brand.colors.primary,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
