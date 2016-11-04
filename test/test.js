var combineLoaders = require('../combineLoaders');

var test = require('tap').test;

test('example', (t) => {
  const output = combineLoaders([
    {
      loader: 'css-loader',
      query: {
        modules: true,
        sourceMap: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
    {
      loader: 'sass-loader',
      query: {
        sourceMap: true,
        includePaths: [
          'app/assets/stylesheets',
          'app/assets/stylesheets/legacy',
        ],
      },
    },
  ]);
  const expected = 'css-loader?modules=true&sourceMap=true&localIdentName=[name]__[local]--[hash:base64:5]!sass-loader?sourceMap=true&includePaths[]=app/assets/stylesheets&includePaths[]=app/assets/stylesheets/legacy';
  t.equals(output, expected);
  t.end();
});
