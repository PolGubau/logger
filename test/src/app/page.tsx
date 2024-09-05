'use client';

import { LogList, log } from '@codedbypol/logger';
import React from 'react';

const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function Home({ searchParams }: any) {
  const [showAutoClose, setShowAutoClose] = React.useState(false);
  const [showDismiss, setShowDismiss] = React.useState(false);
  const [theme, setTheme] = React.useState(searchParams.theme || 'light');
  const [isFinally, setIsFinally] = React.useState(false);

  return (
    <>
      <button data-testid="theme-button" className="button" onClick={() => setTheme('dark')}>
        Change theme
      </button>
      <button data-testid="default-button" className="button" onClick={() => log('My Toast')}>
        Render Toast
      </button>
      <button data-testid="default-button-top" className="button" onClick={() => log('My Toast')}>
        Render Toast Top
      </button>
      <button data-testid="success" className="button" onClick={() => log.success('My Success Toast')}>
        Render Success Toast
      </button>
      <button data-testid="error" className="button" onClick={() => log.error('My Error Toast')}>
        Render Error Toast
      </button>
      <button
        data-testid="action"
        className="button"
        onClick={() =>
          log('My Message', {
            action: {
              label: 'Action',
              onClick: () => console.log('Action'),
            },
          })
        }
      >
        Render Action Toast
      </button>
      <button
        data-testid="action-prevent"
        className="button"
        onClick={() =>
          log('My Message', {
            action: {
              label: 'Action',
              onClick: (event) => {
                event.preventDefault();
                console.log('Action');
              },
            },
          })
        }
      >
        Render Action Toast
      </button>
      <button
        data-testid="promise"
        data-finally={isFinally ? '1' : '0'}
        className="button"
        onClick={() =>
          log.promise(promise, {
            loading: 'Loading...',
            success: 'Loaded',
            error: 'Error',
            finally: () => setIsFinally(true),
          })
        }
      >
        Render Promise Toast
      </button>
      <button
        data-testid="custom"
        className="button"
        onClick={() =>
          log.custom((t) => (
            <div>
              <h1>jsx</h1>
              <button data-testid="dismiss-button" onClick={() => log.dismiss(t)}>
                Dismiss
              </button>
            </div>
          ))
        }
      >
        Render Custom Toast
      </button>
      <button
        data-testid="custom-cancel-button-toast"
        className="button"
        onClick={() =>
          log('My Custom Cancel Button', {
            cancel: {
              label: 'Cancel',
              onClick: () => console.log('Cancel'),
            },
          })
        }
      >
        Render Custom Cancel Button
      </button>
      <button data-testid="infinity-toast" className="button" onClick={() => log('My Toast', { duration: Infinity })}>
        Render Infinity Toast
      </button>
      <button
        data-testid="auto-close-toast-callback"
        className="button"
        onClick={() =>
          log('My Toast', {
            onAutoClose: () => setShowAutoClose(true),
          })
        }
      >
        Render Toast With onAutoClose callback
      </button>
      <button
        data-testid="dismiss-toast-callback"
        className="button"
        onClick={() =>
          log('My Toast', {
            onDismiss: () => setShowDismiss(true),
          })
        }
      >
        Render Toast With onAutoClose callback
      </button>
      <button
        data-testid="non-dismissible-toast"
        className="button"
        onClick={() =>
          log('My Toast', {
            dismissible: false,
          })
        }
      >
        Non-dismissible Toast
      </button>
      <button
        data-testid="update-toast"
        className="button"
        onClick={() => {
          const toastId = log('My Unupdated Toast', {
            duration: 10000,
          });
          log('My Updated Toast', {
            id: toastId,
            duration: 10000,
          });
        }}
      >
        Updated Toast
      </button>
      <button
        data-testid="string-description"
        className="button"
        onClick={() => log('Custom Description', { description: 'string description' })}
      >
        String Description
      </button>
      <button
        data-testid="react-node-description"
        className="button"
        onClick={() => log('Custom Description', { description: <div>This is my custom ReactNode description</div> })}
      >
        ReactNode Description
      </button>
      {showAutoClose ? <div data-testid="auto-close-el" /> : null}
      {showDismiss ? <div data-testid="dismiss-el" /> : null}
      <LogList
        toastOptions={{
          actionButtonStyle: { backgroundColor: 'rgb(219, 239, 255)' },
          cancelButtonStyle: { backgroundColor: 'rgb(254, 226, 226)' },
        }}
        dir={searchParams.dir || 'auto'}
      />
    </>
  );
}

Home.theme = 'light';
