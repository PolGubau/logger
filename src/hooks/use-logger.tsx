'use client';

import { useEffect, useState } from 'react';
import { ToastState } from '../state';
import { LogType } from '../types';

export function useLogger() {
  const [activeToasts, setActiveToasts] = useState<LogType[]>([]);

  useEffect(() => {
    return ToastState.subscribe((toast) => {
      setActiveToasts((currentToasts) => {
        if ('dismiss' in toast && toast.dismiss) {
          return currentToasts.filter((t) => t.id !== toast.id);
        }

        const existingToastIndex = currentToasts.findIndex((t) => t.id === toast.id);
        if (existingToastIndex !== -1) {
          const updatedToasts = [...currentToasts];
          updatedToasts[existingToastIndex] = { ...updatedToasts[existingToastIndex], ...toast };
          return updatedToasts;
        } else {
          return [toast, ...currentToasts];
        }
      });
    });
  }, []);

  return {
    toasts: activeToasts,
  };
}
