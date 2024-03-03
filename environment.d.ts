declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_HOST: string;
            DB_DIALECT: string;
            DB_PORT: string;
            DB_ALTER: string;
            JWT_KEY: string;
            SEND_GRID_API_KEY: string;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
        }
    }
}

export { }
