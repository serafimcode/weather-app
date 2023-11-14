import { registerAs } from '@nestjs/config';

// export default () => ({
//   port: parseInt(process.env.PORT, 10) || 3000,
//   database: {
//     type: process.env.DB_TYPE || 'postgres',
//     host: process.env.DB_HOST || 'localhost',
//     port: parseInt(process.env.DB_PORT, 10) || 5432,
//     username: process.env.DB_USERNAME || 'postgres',
//     password: process.env.DB_PASSWORD || '123',
//     name: process.env.DB_NAME || 'weather-app-db',
//   },
// });
export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  name: process.env.DB_NAME || 'postgres',
}));
