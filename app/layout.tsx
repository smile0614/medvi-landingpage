import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "QUAD by MEDVi",
  description:
    "MEDVi is changing the way patients receive healthcare. From 24/7, one-on-one support to personalized care, MEDVi patients are taken care of from start to finish.",
  openGraph: {
    type: "website",
    title: "QUAD by MEDVi",
    description:
      "MEDVi is changing the way patients receive healthcare. From 24/7, one-on-one support to personalized care, MEDVi patients are taken care of from start to finish.",
    images: [
      "https://framerusercontent.com/images/lq7E8cjKLzZdwet17utaHdrz5yQ.jpg",
    ],
    url: "https://quad.medvi.org/",
  },
  twitter: {
    card: "summary_large_image",
    title: "QUAD by MEDVi",
    description:
      "MEDVi is changing the way patients receive healthcare. From 24/7, one-on-one support to personalized care, MEDVi patients are taken care of from start to finish.",
    images: [
      "https://framerusercontent.com/images/lq7E8cjKLzZdwet17utaHdrz5yQ.jpg",
    ],
  },
  robots: "max-image-preview:large",
  icons: {
    icon: [
      {
        url: "https://framerusercontent.com/images/xWKyg85eDVm8FJeXNodQY3RoGpE.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://framerusercontent.com/images/bydx2BiurtqN42g6aB4Icdp0.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple:
      "https://framerusercontent.com/images/xWKyg85eDVm8FJeXNodQY3RoGpE.png",
  },
  other: {
    "framer-search-index":
      "https://framerusercontent.com/sites/1UK0F9xeXCRzikXotG5CjL/searchIndex-UzVBM8YGoqjd.json",
    "framer-search-index-fallback":
      "https://framerusercontent.com/sites/1UK0F9xeXCRzikXotG5CjL/searchIndex-5YzYTsTOurYh.json",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-redirect-timezone="1">
      <head>
        <meta name="viewport" content="width=device-width" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
        <link rel="canonical" href="https://quad.medvi.org/" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        {children}
        <Script src="https://js.stripe.com/v3" strategy="afterInteractive" />
        <Script
          src="https://plausible.io/js/pa-8tSaQi3IW7T5clkRLuL8I.js"
          strategy="afterInteractive"
          async
        />
        <Script
          src="https://dev.visualwebsiteoptimizer.com/lib/1023394.js"
          id="vwoCode"
          strategy="afterInteractive"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <Script src="/scripts.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
