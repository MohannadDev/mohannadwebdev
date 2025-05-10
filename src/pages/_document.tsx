import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to important domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon configuration */}
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* SPA routing - no server */}
        <meta name="application-name" content="Mohannad - Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#212121" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}