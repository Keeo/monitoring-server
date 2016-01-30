import crypto from 'crypto';

export default function() {
  return {
    crypto: crypto,
    getToken() {
      return this.crypto.randomBytes(64).toString('hex');
    },
    getSalt() {
      return this.crypto.randomBytes(32).toString('hex');
    },
    getHash(password, salt) {
      if (!password || !salt) {
        throw 'Password and Salt must be defined.';
      }
      return this.crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    }
  };
}
