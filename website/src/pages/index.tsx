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

export default function Home() {
  return (
    <AppProvider>
      <div className="wrapper light">
        <Head />
        <main className="container">
          <Hero />
          <LogList />
          <div className="content">
            <Installation />
            <Usage />
            <Types />

            <How />
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
