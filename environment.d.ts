declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_NAME: string;
            PORT: number;
        }
    }
}

export { }