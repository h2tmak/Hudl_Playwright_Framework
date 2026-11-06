type LogLevel = 'INFO' | 'ERROR';

function log(level: LogLevel, message: string): void {
  const output = `[${level}] ${new Date().toISOString()} ${message}`;

  if (level === 'ERROR') {
    console.error(output);
    return;
  }

  console.info(output);
}

export const logger = {
  info(message: string): void {
    log('INFO', message);
  },
  error(message: string): void {
    log('ERROR', message);
  },
};
