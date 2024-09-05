import { LogListProps } from '../types';

export function getDocumentDirection(): LogListProps['dir'] {
  if (typeof window === 'undefined') return 'ltr';
  if (typeof document === 'undefined') return 'ltr'; // For Fresh purpose

  const dirAttribute = document.documentElement.getAttribute('dir');

  if (dirAttribute === 'auto' || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction as LogListProps['dir'];
  }

  return dirAttribute as LogListProps['dir'];
}
