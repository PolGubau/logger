'use client';

import { useLocalStorage } from 'pol-ui';
import { LogType } from '../types';

export function useLogger(lsKey: string = 'logs') {
  const [logs, setLogs] = useLocalStorage<LogType[]>(lsKey, []);

  const log = (log: LogType) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  const deleteLog = (id: string | number) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const deleteLogByIndex = (index: number) => {
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs];
      newLogs.splice(index, 1);
      return newLogs;
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    logs,
    log,
    deleteLog,
    deleteLogByIndex,
    clearLogs,
  };
}
