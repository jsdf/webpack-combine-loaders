var qs = require('qs');

function combineLoaders(loaders) {
  return loaders
    .map(function(loaderEntry) {
      if (typeof loaderEntry === 'string') {
        return loaderEntry;
      }

      var query = qs.stringify(loaderEntry.options || loaderEntry.query, {
        arrayFormat: 'brackets',
        encode: false,
      });

      if (query) {
        query = '?' + query;
      }

      return loaderEntry.loader + query;
    })
    .join('!');
}

module.exports = combineLoaders;
