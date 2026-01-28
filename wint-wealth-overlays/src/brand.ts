// Wint Wealth Brand Configuration
// Update these values to match your brand assets

export const brand = {
  // Colors - Based on Wint Wealth's fintech aesthetic
  // Elephant logo represents stability, wisdom, trust
  colors: {
    primary: "#1E3A5F",      // Deep navy blue - trust & stability
    secondary: "#2DD4BF",    // Teal/mint - growth & freshness
    accent: "#10B981",       // Green - money & success
    highlight: "#FCD34D",    // Gold/yellow - premium, returns
    background: "#0F172A",   // Dark slate - professional
    backgroundLight: "#1E293B",
    text: "#FFFFFF",
    textMuted: "#94A3B8",
    success: "#22C55E",
    comparison: {
      fd: "#6B7280",         // Gray for FD (boring/old)
      bonds: "#10B981",      // Green for bonds (better)
    },
  },

  // Typography
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },

  // Logo - Replace with actual logo URL or use staticFile()
  // For now, using text-based logo
  logoText: "wint wealth",

  // Stats to display in overlays
  stats: {
    returns: "9-12%",
    minInvestment: "₹1,000",
    investors: "85,000+",
    defaults: "0%",
    aumCr: "₹3,000 Cr+",
  },

  // CTA
  cta: {
    primary: "Start Investing",
    secondary: "Download Now",
    appStore: "Available on App Store & Play Store",
  },
} as const;

// Video dimensions for 9:16 Reels
export const REEL_WIDTH = 1080;
export const REEL_HEIGHT = 1920;
export const FPS = 30;
