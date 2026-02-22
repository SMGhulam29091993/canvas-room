import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret',
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET || 'your-default-refresh-secret',
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
}