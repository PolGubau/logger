import { motion } from 'framer-motion';
import Highlight, { defaultProps } from 'prism-react-renderer';
import useMeasure from 'react-use-measure';

import { CopyButton } from 'pol-ui';
const theme = {
  plain: {
    color: 'var(--gray12)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'var(--gray9)',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector', 'string'],
      style: {
        color: 'var(--gray11)',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'var(--gray9)',
      },
    },
    {
      types: ['class-name', 'function', 'tag'],
      style: {
        color: 'var(--gray12)',
      },
    },
  ],
};

export const CodeBlock = ({ children, initialHeight = 0 }: { children: string; initialHeight?: number }) => {
  const [ref, bounds] = useMeasure();

  return (
    <section className="gap-1 grid grid-cols-[1fr,auto] max-h-screen">
      <div className="">
        <Highlight {...defaultProps} theme={theme} code={children} language="jsx">
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <motion.pre
              className=""
              animate={{ height: bounds.height || initialHeight }}
              transition={{ type: 'easeOut', duration: 0.2 }}
            >
              <div className={`${className} `} ref={ref}>
                <div />
                {tokens.map((line, i) => {
                  const { key: lineKey, ...rest } = getLineProps({ line, key: i });
                  return (
                    <div key={lineKey} {...rest}>
                      {line.map((token, key) => {
                        const { key: tokenKey, ...rest } = getTokenProps({ token, key });
                        return <span key={tokenKey} {...rest} />;
                      })}
                    </div>
                  );
                })}
              </div>
            </motion.pre>
          )}
        </Highlight>
      </div>
      <nav className="flex flex-col gap-3 h-full">
        <div className="sticky top-2 mt-2">
          <CopyButton className={''} toCopy={children} />
        </div>
      </nav>
    </section>
  );
};
