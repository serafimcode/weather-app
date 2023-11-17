import { registerAs } from '@nestjs/config';

export default registerAs('session', () => ({
  secret: process.env.SESSION_SECRET || 'my-secret',
  resave: process.env.SESSION_RESAVE || false,
  saveUninitialized: process.env.SESSION_SAVE_UNINIT || false,
  cookieSecure: process.env.SESSION_COOKIE_SECURE || false,
  cookieMaxAge: process.env.SESSION_COOKIE_MAX_AGE || 24 * 60 * 60 * 1000,
}));
