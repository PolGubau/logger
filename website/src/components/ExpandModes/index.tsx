import { log } from '@codedbypol/logger';
import { CodeBlock } from '../CodeBlock';

export const ExpandModes = ({
  expand,
  setExpand,
}: {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <h2>Expand</h2>
      <p>
        You can change the amount of logs visible through the <code>visiblelogs</code> prop.
      </p>
      <div className="buttons">
        <button
          data-active={expand}
          className="button"
          onClick={() => {
            log('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
            setExpand(true);
          }}
        >
          Expand
        </button>
        <button
          data-active={!expand}
          className="button"
          onClick={() => {
            log('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
            setExpand(false);
          }}
        >
          Default
        </button>
      </div>
      <CodeBlock>{`<loger expand={${expand}} />`}</CodeBlock>
    </div>
  );
};
