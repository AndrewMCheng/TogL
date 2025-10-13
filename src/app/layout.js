import "./globals.css";

export const metadata = {
  title: "TogL - Daily Puzzle Game",
  description:
    "TogL - a daily puzzle game inspired by Lights Out. Solve today's puzzle, challenge yourself, and share your score with friends!",
  keywords: ['Togle','Lights Out', 'Daily Puzzle', 'Logic Game', 'TogL', 'Brain Teaser', 'Puzzle Challenge', 'Mind Game', 'Daily Challenge', 'Strategy Game', 'Puzzle Solver', 'Casual Game', 'Addictive Game', 'Puzzle Fun', 'Browser Game', 'Wordle', 'Linear Algebra', 'Matrix Game', 'System of Equations', 'Game Theory',],
  openGraph: {
    title: 'TogL - Daily Lights Out Puzzle',
    description: 'Can you solve today\'s Lights Out puzzle? Challenge yourself with a new daily puzzle and share your score!',
    url: 'https://toglegame.com',
    siteName: 'TogL',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TogL Daily Puzzle Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "TogL - Daily Puzzle Game",
    description: "Solve today's puzzle and share your score!",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/togl.png",
  },
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="google-site-verification" content="Hgk3HzXsPQGrhvKtS_dmxOueIybdI6INpBS6hfLXA3g"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="color-scheme" content="light dark" />

      </head>
      <body>
        {children}
      </body>


    </html>
  );
}
