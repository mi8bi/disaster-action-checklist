import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "防災 行動チェック",
  description: "災害時の行動確認チェックリスト",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "防災チェック",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

declare global {
  interface Window {
    // ServiceWorkerContainer interface
  }
}

function RegisterServiceWorker() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            window.addEventListener("load", () => {
              navigator.serviceWorker.register("/sw.js").then(
                (registration) => {
                  console.log("ServiceWorker registration successful:", registration.scope);
                },
                (err) => {
                  console.log("ServiceWorker registration failed: ", err);
                }
              );
            });
          }
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
