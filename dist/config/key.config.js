"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 8000,
    database: {
        uri: process.env.MONGO_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    redis: {
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10),
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM,
    },
});
//# sourceMappingURL=key.config.js.map