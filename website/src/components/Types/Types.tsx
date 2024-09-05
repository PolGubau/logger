import React from 'react';
import { log } from '@codedbypol/logger';
import { CodeBlock } from '../CodeBlock';

const promiseCode = '`${data.name} log has been added`';

export const Types = () => {
  const [activeType, setActiveType] = React.useState(allTypes[0]);

  return (
    <div>
      <h2>Types</h2>
      <p>You can customize the type of log you want to render, and pass an options object as the second argument.</p>
      <div className="buttons">
        {allTypes.map((type) => (
          <button
            className="button"
            data-active={activeType.name === type.name}
            onClick={() => {
              type.action();
              setActiveType(type);
            }}
            key={type.name}
          >
            {type.name}
          </button>
        ))}
      </div>
      <CodeBlock>{`${activeType.snippet}`}</CodeBlock>
    </div>
  );
};

const allTypes = [
  {
    name: 'Default',
    snippet: `log('Event has been created')`,
    action: () => log('Event has been created'),
  },
  {
    name: 'Description',
    snippet: `log.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
})`,
    action: () =>
      log('Event has been created', {
        description: 'Monday, January 3rd at 6:00pm',
      }),
  },
  {
    name: 'Success',
    snippet: `log.success('Event has been created')`,
    action: () => log.success('Event has been created'),
  },
  {
    name: 'Info',
    snippet: `log.info('Be at the area 10 minutes before the event time')`,
    action: () => log.info('Be at the area 10 minutes before the event time'),
  },
  {
    name: 'Warning',
    snippet: `log.warning('Event start time cannot be earlier than 8am')`,
    action: () => log.warning('Event start time cannot be earlier than 8am'),
  },
  {
    name: 'Error',
    snippet: `log.error('Event has not been created')`,
    action: () => log.error('Event has not been created'),
  },
  {
    name: 'Action',
    snippet: `log('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
})`,
    action: () =>
      log.message('Event has been created', {
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      }),
  },
  {
    name: 'Promise',
    snippet: `const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Logger' }), 2000));

log.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return ${promiseCode};
  },
  error: 'Error',
});`,
    action: () =>
      log.promise<{ name: string }>(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ name: 'Logger' });
            }, 2000);
          }),
        {
          loading: 'Loading...',
          success: (data) => {
            return `${data.name} log has been added`;
          },
          error: 'Error',
        },
      ),
  },
  {
    name: 'Custom',
    snippet: `log(<div>A custom log with default styling</div>)`,
    action: () => log(<div>A custom log with default styling</div>, { duration: 1000000 }),
  },
];
