
import "./globals.css";

export const metadata = {
  title: "Togl - Daily Puzzle Game",
  description:
    "Togl - a daily puzzle game inspired by Lights Out. Solve today's puzzle, challenge yourself, and share your score with friends!",
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
      "Can you solve today's Lights Out puzzle? Challenge yourself with a new daily puzzle and share your score!",
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
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en" className="light-mode">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="google-site-verification"
          content="Hgk3HzXsPQGrhvKtS_dmxOueIybdI6INpBS6hfLXA3g"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              name: "Togl",
              url: "https://toglgame.com",
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
