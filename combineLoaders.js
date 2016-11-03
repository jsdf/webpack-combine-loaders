var qs = require('qs');

function combineLoaders(loaders) {
  return loaders.map(function(loaderEntry) {
    // Careful, won't work if a string is created with `new String('my-loader')`
    // as the type will be Object instead
    if (typeof loaderEntry === 'string') {
      return loaderEntry;
    }

    var query = qs.stringify(
      loaderEntry.options || loaderEntry.query, {
        arrayFormat: 'brackets',
        encode: false,
      });

    if (query) {
      query = '?' + query;
    }

    return loaderEntry.loader + query;
  }).join('!');
}

module.exports = combineLoaders;
