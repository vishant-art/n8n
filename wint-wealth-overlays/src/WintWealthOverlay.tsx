import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
} from "remotion";
import { brand, REEL_WIDTH, REEL_HEIGHT } from "./brand";
import {
  AnimatedCaption,
  KaraokeCaption,
  StatsPopup,
  StatsRow,
  LowerThird,
  BrandLowerThird,
  FDvsBondsComparison,
  ComparisonCards,
  EndCard,
  MinimalEndCard,
} from "./components";

// Props for the overlay - customize timing and content
export type WintWealthOverlayProps = {
  // Timing (in seconds)
  captionStart?: number;
  statsStart?: number;
  comparisonStart?: number;
  endCardStart?: number;

  // Content
  captionText?: string;
  captionLines?: string[];
  highlightWords?: string[];
  speakerName?: string;
  speakerTitle?: string;

  // Toggle sections
  showCaption?: boolean;
  showStats?: boolean;
  showComparison?: boolean;
  showEndCard?: boolean;
  showLowerThird?: boolean;
  showBrandLogo?: boolean;
};

export const WintWealthOverlay: React.FC<WintWealthOverlayProps> = ({
  captionStart = 0,
  statsStart = 5,
  comparisonStart = 15,
  endCardStart = 25,
  captionText = "I can't believe someone like me with zero financial knowledge can make 9 to 12% returns",
  captionLines,
  highlightWords = ["9 to 12%", "returns", "₹1,000", "bonds"],
  speakerName = "",
  speakerTitle = "",
  showCaption = true,
  showStats = true,
  showComparison = true,
  showEndCard = true,
  showLowerThird = true,
  showBrandLogo = true,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        // Transparent background - this overlays on top of your video
        backgroundColor: "transparent",
      }}
    >
      {/* Caption overlay */}
      {showCaption && (
        <Sequence from={Math.round(captionStart * fps)}>
          {captionLines ? (
            <KaraokeCaption lines={captionLines} wordsPerSecond={2.5} />
          ) : (
            <AnimatedCaption
              text={captionText}
              highlightWords={highlightWords}
              position="bottom"
              style="highlight-box"
            />
          )}
        </Sequence>
      )}

      {/* Stats popup */}
      {showStats && (
        <Sequence
          from={Math.round(statsStart * fps)}
          durationInFrames={Math.round(8 * fps)}
        >
          <StatsRow
            stats={[
              { label: "Returns", value: brand.stats.returns },
              { label: "Min Invest", value: brand.stats.minInvestment },
            ]}
          />
        </Sequence>
      )}

      {/* Full stats row */}
      {showStats && (
        <Sequence
          from={Math.round((statsStart + 8) * fps)}
          durationInFrames={Math.round(5 * fps)}
        >
          <StatsRow
            stats={[
              { label: "Investors", value: brand.stats.investors },
              { label: "Defaults", value: brand.stats.defaults },
              { label: "AUM", value: brand.stats.aumCr },
            ]}
          />
        </Sequence>
      )}

      {/* Comparison graphic */}
      {showComparison && (
        <Sequence
          from={Math.round(comparisonStart * fps)}
          durationInFrames={Math.round(5 * fps)}
        >
          <ComparisonCards />
        </Sequence>
      )}

      {/* Lower third with speaker name */}
      {showLowerThird && speakerName && (
        <Sequence
          from={Math.round(2 * fps)}
          durationInFrames={Math.round(10 * fps)}
        >
          <LowerThird name={speakerName} title={speakerTitle} variant="branded" />
        </Sequence>
      )}

      {/* Brand logo lower third */}
      {showBrandLogo && (
        <Sequence from={Math.round(3 * fps)}>
          <BrandLowerThird />
        </Sequence>
      )}

      {/* End card */}
      {showEndCard && (
        <Sequence from={Math.round(endCardStart * fps)}>
          <EndCard />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

// Individual overlay compositions for separate rendering
export const CaptionOnly: React.FC<{
  text: string;
  highlightWords?: string[];
}> = ({ text, highlightWords = [] }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <AnimatedCaption
        text={text}
        highlightWords={highlightWords}
        position="bottom"
        style="highlight-box"
      />
    </AbsoluteFill>
  );
};

export const StatsOnly: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <StatsRow
        stats={[
          { label: "Returns", value: brand.stats.returns },
          { label: "Min Investment", value: brand.stats.minInvestment },
          { label: "Investors", value: brand.stats.investors },
        ]}
      />
    </AbsoluteFill>
  );
};

export const ComparisonOnly: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <ComparisonCards />
    </AbsoluteFill>
  );
};

export const EndCardOnly: React.FC = () => {
  return (
    <AbsoluteFill>
      <EndCard />
    </AbsoluteFill>
  );
};
