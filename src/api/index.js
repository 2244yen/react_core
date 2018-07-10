import Api from './api';
import config from '../config';

const server = new Api(config.url);

export default {
  server: server
}