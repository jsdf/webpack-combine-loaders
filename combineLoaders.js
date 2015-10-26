var qs = require('qs');

function combineLoaders(loaders) {
  return loaders.map(function(loaderEntry) {
    return loaderEntry.loader + '?' + qs.stringify(loaderEntry.query, { arrayFormat: 'brackets' });
  }).join('!');
}

module.exports = combineLoaders;
