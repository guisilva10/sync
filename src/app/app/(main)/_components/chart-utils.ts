// Helpers pra preparar dados dos graficos — usado no server component

function detectPlatform(url: string): string {
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("github.com")) return "github";
  if (url.includes("whatsapp.com") || url.includes("wa.me")) return "whatsapp";
  return "other";
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E4405F",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  github: "#a78bfa",
  whatsapp: "#25D366",
  portfolio: "#8B5CF6",
  other: "#6B7280",
};

export interface PlatformData {
  platform: string;
  clicks: number;
  fill: string;
}

export interface TopUrlData {
  label: string;
  fullUrl: string;
  clicks: number;
}

export function buildPlatformData(
  links: { linkClicks: { url: string; clicks: number }[] }[],
): PlatformData[] {
  const platformMap = new Map<string, number>();
  links.forEach((link) => {
    link.linkClicks.forEach((click) => {
      const platform = detectPlatform(click.url);
      platformMap.set(
        platform,
        (platformMap.get(platform) || 0) + click.clicks,
      );
    });
  });
  return Array.from(platformMap, ([platform, clicks]) => ({
    platform,
    clicks,
    fill: PLATFORM_COLORS[platform] || PLATFORM_COLORS.other,
  })).sort((a, b) => b.clicks - a.clicks);
}

function truncateUrl(url: string, maxLen = 30): string {
  try {
    const parsed = new URL(url);
    const path = parsed.hostname + parsed.pathname;
    return path.length > maxLen ? path.slice(0, maxLen) + "…" : path;
  } catch {
    return url.length > maxLen ? url.slice(0, maxLen) + "…" : url;
  }
}

export function buildTopUrlsData(
  links: { linkClicks: { url: string; clicks: number }[] }[],
): TopUrlData[] {
  return links
    .flatMap((link) => link.linkClicks)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)
    .map((click) => ({
      label: truncateUrl(click.url),
      fullUrl: click.url,
      clicks: click.clicks,
    }));
}
