import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google';

// This App component improves SPA (Single Page Application) behavior
export default function App({ Component, pageProps, router }: AppProps) {
  // Track page views for SPA navigation
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendGAEvent('page_view', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-8GF7F7BCLY'} />
    </>
  );
} 