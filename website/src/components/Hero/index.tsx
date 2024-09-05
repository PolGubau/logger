import { log, ModalView } from '@codedbypol/logger';

import styles from './hero.module.css';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Logger</h1>
      <p className="text-2xl">A complete logging UI and logic for React</p>
      <div className={styles.buttons}>
        <button
          data-primary=""
          onClick={() => {
            log('Logger', {
              description: 'A complete logging UI and logic for React',
            });
          }}
          className={styles.button}
        >
          Render a toast
        </button>
        <a className={styles.button} href="https://github.com/PolGubau/logger" target="_blank">
          GitHub
        </a>
      </div>
      <Link href="/getting-started" className={styles.link}>
        Documentation
      </Link>

      <ModalView />
    </div>
  );
};
