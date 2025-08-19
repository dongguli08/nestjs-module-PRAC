// src/global/config/configuration.ts
export default () => ({
    database: {
        host: process.env.DB_HOST,
    },
    custom: {
        value: process.env.CUSTOM_VALUE || 'defaultValue',
    },
    api: {
        key: process.env.API_KEY,
    },
});
