export default class CryptoUtils {
    static getHash: (toBeHashed: string, salt: number) => Promise<string>;
}
