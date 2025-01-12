import * as bcrypt from 'bcrypt';

export default class CryptoUtils {
  static getHash = async (toBeHashed: string = '', salt: number) => {
    if (!toBeHashed) return '';
    return await bcrypt.hash(toBeHashed, salt);
  };
}
