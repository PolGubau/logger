'use client';
import { PropsWithChildren } from 'react';
import { PoluiProvider } from 'pol-ui';
import React from 'react';
const AppProvider = (props: PropsWithChildren) => {
  return (
    <PoluiProvider>
      <div className="w-full flex justify-center" suppressHydrationWarning>
        {props.children}
      </div>
    </PoluiProvider>
  );
};

export default AppProvider;
