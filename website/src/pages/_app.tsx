import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import '../globals.css';

export default function Nextra({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      {/* @ts-ignore */}
      <Component {...pageProps} suppressHydrationWarning />
      <Analytics />
    </>
  );
}
