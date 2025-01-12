declare const _default: () => {
    port: number;
    database: {
        uri: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    redis: {
        host: string;
        username: string;
        port: string;
        password: string;
    };
    email: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
};
export default _default;
