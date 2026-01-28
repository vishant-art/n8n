import React from "react";
import { Composition, Folder } from "remotion";
import { REEL_WIDTH, REEL_HEIGHT, FPS, brand } from "./brand";
import {
  WintWealthOverlay,
  WintWealthOverlayProps,
  CaptionOnly,
  StatsOnly,
  ComparisonOnly,
  EndCardOnly,
} from "./WintWealthOverlay";

// Script from the brief - Hook variations
const HOOKS = {
  hook1:
    "One thing that I started doing too late in life when it comes to investing, is investing in assets that don't go up and down with the market.",
  hook2:
    "I am guilty of never trying new things. Growing up in a middle-class family dependent on my father's salary, the concept of investing wasn't really discussed at home.",
  hook3:
    "As a middle class person I am too careful about my money. I can't believe that someone like me with zero financial knowledge can make 9 to 12% returns.",
};

// Key dialogue lines
const DIALOGUES = {
  discovery:
    "I recently explored new investment options beyond those familiar fixed deposits and found a whole new world with bonds.",
  introduction:
    "My colleague introduced me to Wint Wealth bonds, and I discovered they're backed by assets and can offer fixed returns of up to 12%.",
  flexibility:
    "They provide flexibility and you can sell them whenever you want.",
  easy: "I thought it would be overwhelming but it really was not! The experience has been so easy.",
  passiveIncome:
    "Cut to the present day, I now enjoy extra passive income every month.",
  cta: "Trust me if a person like me is doing it, you can too. Bonds will give you passive income and you can start with just ₹1,000 too.",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main Compositions */}
      <Folder name="Full-Overlays">
        {/* Complete 30-second overlay with all elements */}
        <Composition
          id="WintWealth-FullOverlay-30s"
          component={WintWealthOverlay}
          durationInFrames={30 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            captionText: HOOKS.hook3,
            highlightWords: ["9 to 12%", "returns", "financial knowledge"],
            showCaption: true,
            showStats: true,
            showComparison: true,
            showEndCard: true,
            showLowerThird: false,
            showBrandLogo: true,
            captionStart: 0,
            statsStart: 8,
            comparisonStart: 16,
            endCardStart: 24,
          } satisfies WintWealthOverlayProps}
        />

        {/* 45-second version */}
        <Composition
          id="WintWealth-FullOverlay-45s"
          component={WintWealthOverlay}
          durationInFrames={45 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            captionText: DIALOGUES.discovery,
            highlightWords: ["bonds", "12%", "returns", "₹1,000"],
            showCaption: true,
            showStats: true,
            showComparison: true,
            showEndCard: true,
            showLowerThird: false,
            showBrandLogo: true,
            captionStart: 0,
            statsStart: 12,
            comparisonStart: 25,
            endCardStart: 38,
          } satisfies WintWealthOverlayProps}
        />
      </Folder>

      {/* Individual Elements - for layering */}
      <Folder name="Individual-Elements">
        {/* Caption only - 10 seconds */}
        <Composition
          id="Caption-Hook1"
          component={CaptionOnly}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            text: HOOKS.hook1,
            highlightWords: ["investing", "market"],
          }}
        />

        <Composition
          id="Caption-Hook2"
          component={CaptionOnly}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            text: HOOKS.hook2,
            highlightWords: ["middle-class", "investing"],
          }}
        />

        <Composition
          id="Caption-Hook3"
          component={CaptionOnly}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            text: HOOKS.hook3,
            highlightWords: ["9 to 12%", "returns"],
          }}
        />

        <Composition
          id="Caption-CTA"
          component={CaptionOnly}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            text: DIALOGUES.cta,
            highlightWords: ["₹1,000", "passive income", "bonds"],
          }}
        />

        {/* Stats overlay - 5 seconds */}
        <Composition
          id="Stats-Popup"
          component={StatsOnly}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
        />

        {/* Comparison graphic - 5 seconds */}
        <Composition
          id="FD-vs-Bonds-Comparison"
          component={ComparisonOnly}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
        />

        {/* End card - 5 seconds */}
        <Composition
          id="End-Card-CTA"
          component={EndCardOnly}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
        />
      </Folder>

      {/* Hook Variations */}
      <Folder name="Hook-Variations">
        <Composition
          id="Hook1-Full"
          component={WintWealthOverlay}
          durationInFrames={30 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            captionText: HOOKS.hook1,
            highlightWords: ["investing", "assets", "market"],
            showCaption: true,
            showStats: true,
            showComparison: true,
            showEndCard: true,
            showLowerThird: false,
            showBrandLogo: true,
          } satisfies WintWealthOverlayProps}
        />

        <Composition
          id="Hook2-Full"
          component={WintWealthOverlay}
          durationInFrames={30 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            captionText: HOOKS.hook2,
            highlightWords: ["middle-class", "investing", "salary"],
            showCaption: true,
            showStats: true,
            showComparison: true,
            showEndCard: true,
            showLowerThird: false,
            showBrandLogo: true,
          } satisfies WintWealthOverlayProps}
        />

        <Composition
          id="Hook3-Full"
          component={WintWealthOverlay}
          durationInFrames={30 * FPS}
          fps={FPS}
          width={REEL_WIDTH}
          height={REEL_HEIGHT}
          defaultProps={{
            captionText: HOOKS.hook3,
            highlightWords: ["9 to 12%", "returns", "financial knowledge"],
            showCaption: true,
            showStats: true,
            showComparison: true,
            showEndCard: true,
            showLowerThird: false,
            showBrandLogo: true,
          } satisfies WintWealthOverlayProps}
        />
      </Folder>
    </>
  );
};
