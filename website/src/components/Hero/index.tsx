import { log } from '@codedbypol/logger';
import Link from 'next/link';
import { Button, buttonVariants, ColorsEnum } from 'pol-ui';
import styles from './hero.module.css';

const data = {
  title: 'Logger',
  description: 'Client open source logging UI and logic for React',
};

//
export const Hero = () => {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2 mt-48">
        <h1 className="text-7xl font-bold">{data.title}</h1>
        <p className="text-2xl opacity-75">{data.description}</p>
      </header>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            log('Home button pressed', {
              description: `You pressed the home button at ${new Date().toLocaleTimeString()}`,
            });
          }}
        >
          Log this!
        </Button>
        <a
          className={buttonVariants({
            color: ColorsEnum.secondary,
          })}
          href="https://github.com/PolGubau/logger"
          target="_blank"
        >
          GitHub
        </a>
      </div>
      <Link href="/getting-started" className={styles.link}>
        Documentation
      </Link>
    </div>
  );
};
