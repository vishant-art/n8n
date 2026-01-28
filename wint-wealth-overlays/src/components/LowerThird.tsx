import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { brand } from "../brand";

type LowerThirdProps = {
  name: string;
  title?: string;
  variant?: "default" | "minimal" | "branded";
};

export const LowerThird: React.FC<LowerThirdProps> = ({
  name,
  title,
  variant = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in animation
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const translateX = interpolate(slideIn, [0, 1], [-300, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Accent line animation
  const lineWidth = interpolate(slideIn, [0, 1], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 40,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* Accent line */}
      <div
        style={{
          width: `${lineWidth}%`,
          height: 4,
          background: `linear-gradient(90deg, ${brand.colors.secondary} 0%, ${brand.colors.accent} 100%)`,
          borderRadius: 2,
          marginBottom: 8,
        }}
      />

      {/* Name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {variant === "branded" && (
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: brand.colors.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: brand.fonts.heading,
              fontSize: 24,
              fontWeight: 800,
              color: brand.colors.primary,
            }}
          >
            W
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: brand.fonts.heading,
              fontSize: 36,
              fontWeight: 700,
              color: brand.colors.text,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {name}
          </span>

          {title && (
            <span
              style={{
                fontFamily: brand.fonts.body,
                fontSize: 22,
                fontWeight: 500,
                color: brand.colors.textMuted,
              }}
            >
              {title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Logo lower third - shows Wint Wealth branding
export const BrandLowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(0, 0, 0, 0.6)",
          padding: "16px 32px",
          borderRadius: 100,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Elephant icon placeholder - simple circle with W */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${brand.colors.secondary} 0%, ${brand.colors.accent} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: brand.fonts.heading,
            fontSize: 22,
            fontWeight: 800,
            color: brand.colors.primary,
          }}
        >
          W
        </div>

        <span
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 28,
            fontWeight: 600,
            color: brand.colors.text,
            letterSpacing: 1,
          }}
        >
          {brand.logoText}
        </span>
      </div>
    </div>
  );
};
