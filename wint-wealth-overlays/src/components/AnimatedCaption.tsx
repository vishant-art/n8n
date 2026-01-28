import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { brand } from "../brand";

type CaptionProps = {
  text: string;
  startFrame?: number;
  highlightWords?: string[];
  position?: "top" | "center" | "bottom";
  style?: "default" | "bold" | "highlight-box";
};

export const AnimatedCaption: React.FC<CaptionProps> = ({
  text,
  startFrame = 0,
  highlightWords = [],
  position = "bottom",
  style = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  // Entrance animation
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  // Position mapping
  const positionStyles: Record<string, React.CSSProperties> = {
    top: { top: 120, bottom: "auto" },
    center: { top: "50%", transform: `translateY(-50%) translateY(${translateY}px)` },
    bottom: { bottom: 200, top: "auto" },
  };

  // Split text into words and highlight specified ones
  const words = text.split(" ");

  // Calculate which word to highlight based on frame (for karaoke effect)
  const wordsPerSecond = 2.5;
  const currentWordIndex = Math.floor((relativeFrame / fps) * wordsPerSecond);

  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: position !== "center" ? `translateY(${translateY}px)` : undefined,
        ...positionStyles[position],
      }}
    >
      <div
        style={{
          backgroundColor:
            style === "highlight-box"
              ? "rgba(0, 0, 0, 0.7)"
              : "transparent",
          padding: style === "highlight-box" ? "20px 30px" : 0,
          borderRadius: 16,
          maxWidth: "90%",
        }}
      >
        <p
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: style === "bold" ? 52 : 44,
            fontWeight: style === "bold" ? 800 : 600,
            color: brand.colors.text,
            textAlign: "center",
            lineHeight: 1.4,
            margin: 0,
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          {words.map((word, index) => {
            const isHighlighted =
              highlightWords.some((hw) =>
                word.toLowerCase().includes(hw.toLowerCase())
              ) || index === currentWordIndex;

            return (
              <span
                key={index}
                style={{
                  color: isHighlighted
                    ? brand.colors.highlight
                    : brand.colors.text,
                  transition: "color 0.1s",
                }}
              >
                {word}
                {index < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

// Multi-line caption with word-by-word reveal
export const KaraokeCaption: React.FC<{
  lines: string[];
  startFrame?: number;
  wordsPerSecond?: number;
}> = ({ lines, startFrame = 0, wordsPerSecond = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const allWords = lines.flatMap((line, lineIndex) =>
    line.split(" ").map((word, wordIndex) => ({
      word,
      lineIndex,
      globalIndex:
        lines.slice(0, lineIndex).reduce((acc, l) => acc + l.split(" ").length, 0) +
        wordIndex,
    }))
  );

  const currentWordIndex = Math.floor((relativeFrame / fps) * wordsPerSecond);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: 40,
        right: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {lines.map((line, lineIndex) => (
        <p
          key={lineIndex}
          style={{
            fontFamily: brand.fonts.heading,
            fontSize: 48,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
            margin: 0,
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
          }}
        >
          {line.split(" ").map((word, wordIndex) => {
            const globalIndex =
              lines
                .slice(0, lineIndex)
                .reduce((acc, l) => acc + l.split(" ").length, 0) + wordIndex;
            const isSpoken = globalIndex <= currentWordIndex;

            return (
              <span
                key={wordIndex}
                style={{
                  color: isSpoken ? brand.colors.text : brand.colors.textMuted,
                }}
              >
                {word}
                {wordIndex < line.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
};
