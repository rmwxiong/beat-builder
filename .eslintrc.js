module.exports = {
  'extends': 'google',
  'es6': true,
  'env': {
    browser: true,
    node: true
  },
  'globals': {
    'Beet': true,
    'Howler': true,
    'Howl': true,
    'T': true,
    'timbre': true
  },
  'rules': {
    'max-len': [1, 120, 4],
    'quote-props': [0, 'as-needed'],
    'no-else-return': 0,
    'require-jsdoc': 0,
    'curly': 0,
    'new-cap': 0
  }
};
