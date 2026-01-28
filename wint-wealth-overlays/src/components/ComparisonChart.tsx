import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { brand } from "../brand";

type ComparisonItem = {
  label: string;
  value: number;
  displayValue: string;
  color: string;
};

type ComparisonChartProps = {
  title?: string;
  items: ComparisonItem[];
  variant?: "bars" | "pills";
};

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title = "FD vs Bonds",
  items,
  variant = "bars",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Container entrance
  const containerEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const containerOpacity = interpolate(containerEntrance, [0, 1], [0, 1]);
  const containerScale = interpolate(containerEntrance, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${containerScale})`,
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        padding: 48,
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: 32,
        backdropFilter: "blur(20px)",
        minWidth: 600,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: brand.fonts.heading,
          fontSize: 40,
          fontWeight: 700,
          color: brand.colors.text,
          margin: 0,
          textAlign: "center",
        }}
      >
        {title}
      </h2>

      {/* Comparison bars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          width: "100%",
        }}
      >
        {items.map((item, index) => {
          // Staggered bar animation
          const barEntrance = spring({
            frame: frame - 15 - index * 10,
            fps,
            config: { damping: 20, stiffness: 100 },
          });

          const barWidth = interpolate(
            barEntrance,
            [0, 1],
            [0, item.value],
            { extrapolateRight: "clamp" }
          );

          const valueOpacity = interpolate(
            barEntrance,
            [0.7, 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Label */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: brand.fonts.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: brand.colors.text,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: brand.fonts.heading,
                    fontSize: 36,
                    fontWeight: 800,
                    color: item.color,
                    opacity: valueOpacity,
                  }}
                >
                  {item.displayValue}
                </span>
              </div>

              {/* Bar */}
              <div
                style={{
                  width: "100%",
                  height: 24,
                  background: brand.colors.backgroundLight,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    background: item.color,
                    borderRadius: 12,
                    boxShadow: `0 0 20px ${item.color}50`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Pre-configured FD vs Bonds comparison
export const FDvsBondsComparison: React.FC = () => {
  return (
    <ComparisonChart
      title="Returns Comparison"
      items={[
        {
          label: "Fixed Deposits",
          value: 60, // 6% represented as 60% of bar
          displayValue: "6-7%",
          color: brand.colors.comparison.fd,
        },
        {
          label: "Wint Bonds",
          value: 100, // 12% represented as 100% of bar
          displayValue: "9-12%",
          color: brand.colors.comparison.bonds,
        },
      ]}
    />
  );
};

// Simple side-by-side comparison cards
export const ComparisonCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftCard = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const rightCard = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const vsEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* FD Card */}
      <div
        style={{
          opacity: interpolate(leftCard, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(leftCard, [0, 1], [-50, 0])}px)`,
          background: brand.colors.backgroundLight,
          padding: "40px 48px",
          borderRadius: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          border: `2px solid ${brand.colors.comparison.fd}`,
        }}
      >
        <span
          style={{
            fontFamily: brand.fonts.body,
            fontSize: 24,
            color: brand.colors.textMuted,
          }}
        >
          Fixed Deposits
        </span>
        <span
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 56,
            fontWeight: 800,
            color: brand.colors.comparison.fd,
          }}
        >
          6-7%
        </span>
      </div>

      {/* VS */}
      <div
        style={{
          opacity: interpolate(vsEntrance, [0, 1], [0, 1]),
          transform: `scale(${interpolate(vsEntrance, [0, 1], [0, 1])})`,
          fontFamily: brand.fonts.heading,
          fontSize: 32,
          fontWeight: 700,
          color: brand.colors.textMuted,
        }}
      >
        vs
      </div>

      {/* Bonds Card */}
      <div
        style={{
          opacity: interpolate(rightCard, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(rightCard, [0, 1], [50, 0])}px)`,
          background: brand.colors.backgroundLight,
          padding: "40px 48px",
          borderRadius: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          border: `2px solid ${brand.colors.comparison.bonds}`,
          boxShadow: `0 0 30px ${brand.colors.comparison.bonds}30`,
        }}
      >
        <span
          style={{
            fontFamily: brand.fonts.body,
            fontSize: 24,
            color: brand.colors.textMuted,
          }}
        >
          Wint Bonds
        </span>
        <span
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 56,
            fontWeight: 800,
            color: brand.colors.comparison.bonds,
          }}
        >
          9-12%
        </span>
      </div>
    </div>
  );
};
