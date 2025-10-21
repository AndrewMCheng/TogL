
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Togl - Daily Puzzle Game",
  description:
    "Togl - a daily puzzle game inspired by Lights Out. Solve today's puzzle, challenge yourself, and share your score with friends!",
  metadataBase: new URL("https://playtogl.com"),
  keywords: [
    "Togl",
    "Lights Out",
    "Daily Puzzle",
    "Logic Game",
    "Brain Teaser",
    "Puzzle Challenge",
    "Mind Game",
    "Daily Challenge",
    "Strategy Game",
    "Puzzle Solver",
    "Casual Game",
    "Addictive Game",
    "Puzzle Fun",
    "Browser Game",
    "Wordle",
    "Linear Algebra",
    "Matrix Game",
    "System of Equations",
    "Game Theory",
  ],
  openGraph: {
    title: "Togl - Daily Lights Out Puzzle",
    description:
      "Can you solve today's puzzle? Challenge yourself with a new daily puzzle and share your score!",
    url: "https://playtogl.com",
    siteName: "Togl",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Togl Daily Puzzle Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Togl - Daily Puzzle Game",
    description: "Solve today's puzzle and share your score!",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light-mode" suppressHydrationWarning={true}>
      <head>

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"></link>
        <link rel="manifest" href="favicon/site.webmanifest"></link>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const darkMode = localStorage.getItem('darkMode') === 'true';
                  document.documentElement.classList.add(darkMode ? 'dark-mode' : 'light-mode');
                } catch(e) {}
              })();
            `,
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YK9722PXNR"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YK9722PXNR');
            `,
          }}
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="google-site-verification"
          content="Hgk3HzXsPQGrhvKtS_dmxOueIybdI6INpBS6hfLXA3g"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="color-scheme" content="light dark" />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              name: "Togl",
              url: "https://playtogl.com",
              description:
                "Togl - a daily puzzle game inspired by Lights Out. Solve today's puzzle and challenge yourself!",
              image: "https://playtogl.com/og-image.png",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
