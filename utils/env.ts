import 'dotenv/config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export function getLoginCredentials(): LoginCredentials {
  const email = process.env.HUDL_EMAIL?.trim();
  const password = process.env.HUDL_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set HUDL_EMAIL and HUDL_PASSWORD in .env to run the authenticated login test.',
    );
  }

  return { email, password };
}

export function hasLoginCredentials(): boolean {
  return Boolean(process.env.HUDL_EMAIL?.trim() && process.env.HUDL_PASSWORD);
}
