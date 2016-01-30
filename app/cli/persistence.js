import builder from '../persistence/builder';
import config from '../config';

export default function() {
  return builder(config.persistence);
}
