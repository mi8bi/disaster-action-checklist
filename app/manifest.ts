import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "防災 行動チェック",
    short_name: "防災チェック",
    description: "災害時の行動確認チェックリスト",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["lifestyle", "productivity"],
    screenshots: [
      {
        src: "/screenshot-540x720.svg",
        sizes: "540x720",
        type: "image/svg+xml",
        form_factor: "narrow",
      },
      {
        src: "/screenshot-1280x720.svg",
        sizes: "1280x720",
        type: "image/svg+xml",
        form_factor: "wide",
      },
    ],
  };
}
