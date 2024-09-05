'use client';
import { PropsWithChildren } from 'react';
import { PoluiProvider } from 'pol-ui';
const AppProvider = (props: PropsWithChildren) => {
  return <PoluiProvider>{props.children}</PoluiProvider>;
};

export default AppProvider;
