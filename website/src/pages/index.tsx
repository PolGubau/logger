import React from 'react';
import { LogList } from '@codedbypol/logger';
import { Installation } from '@/src/components/Installation';
import { Hero } from '@/src/components/Hero';
import { Types } from '@/src/components/Types/Types';
import { Usage } from '@/src/components/Usage';
import Head from '../components/Head';
import { How } from '../components/How/How';
import { Footer } from '../components/Footer';
import AppProvider from '../components/Providers/AppProvider';
import { UiOptions } from '../components/UiOptions';

export default function Home() {
  return (
    <AppProvider>
      <div>
        <Head />
        <main suppressHydrationWarning className="md:max-w-2xl flex flex-col gap-8 p-4 pt-24 w-full">
          <Hero />
          <LogList />

          {/*  */}
          <Installation />
          <Usage />
          <UiOptions />
          <Types />

          <How />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
