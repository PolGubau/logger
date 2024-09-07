'use client';

import { CodeBlock } from '../CodeBlock';
import SubTitle from '../ui/SubTitle';

export const Installation = () => {
  return (
    <div className="flex flex-col gap-2">
      <SubTitle>Installation</SubTitle>
      <CodeBlock initialHeight={70}>{`pnpm i @codedbypol/logger`}</CodeBlock>
    </div>
  );
};
