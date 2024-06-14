let configValue;

switch (process.env.REACT_APP_ENV) {
  case 'docker':
    configValue = require('./config.docker').default;
    break;
  case 'production':
    configValue = require('./config.prod').default;
    break;
  case 'development':
  case 'local':
  default:
    configValue = require('./config.local').default;
    break;
}

export const config = configValue;
