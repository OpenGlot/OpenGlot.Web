let configValue;

switch (process.env.REACT_APP_ENV) {
  case 'docker':
    configValue = require('./config.docker').default;
    break;
  case 'prod':
    configValue = require('./config.prod').default;
    break;
  case 'beta':
      configValue = require('./config.beta').default;
      break;
  case 'development':
  case 'local':
  default:
    configValue = require('./config.local').default;
    break;
}

export const config = configValue;
