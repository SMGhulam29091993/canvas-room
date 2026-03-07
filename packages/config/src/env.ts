import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({path : path.resolve(__dirname, '../../../.env')});

const configENV = process.env.NODE_ENV || 'development';

if (!configENV) console.log('No environment specified, using defaults...');

export const config = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret',
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET || 'your-default-refresh-secret',
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
}