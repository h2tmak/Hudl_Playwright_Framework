import 'dotenv/config';

const defaultBaseURL = 'https://www.hudl.com';
const configuredBaseURL = process.env.BASE_URL?.trim() || defaultBaseURL;

try {
  new URL(configuredBaseURL);
} catch {
  throw new Error(
    `BASE_URL must be an absolute URL. Received: "${configuredBaseURL}".`,
  );
}

export const environments = {
  baseURL: configuredBaseURL.replace(/\/+$/, ''),
} as const;
