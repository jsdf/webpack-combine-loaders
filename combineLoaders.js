var qs = require('qs');

function combineLoaders(loaders) {
  return loaders.map(function(loaderEntry) {
    var query = qs.stringify(loaderEntry.query, { arrayFormat: 'brackets' });
    if (query) {
      query = '?' + query;
    }
    return loaderEntry.loader + query;
  }).join('!');
}

module.exports = combineLoaders;
