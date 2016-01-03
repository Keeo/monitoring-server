import crypto from 'crypto';

export default function() {
  return {
    crypto: crypto,
    getNodeHash() {
      return this.crypto.randomBytes(64).toString('hex');
    }
  };
}
