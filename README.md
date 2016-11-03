# webpack-combine-loaders

Converts an array of loaders defined using the `{loader, query}` object syntax into a single loader string. Useful for dealing with plugins which only understand the loader string syntax.

```js
combineLoaders([
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
// => 'css-loader?modules=true&sourceMap=true&localIdentName=%5Bname%5D__%5Blocal%5D--%5Bhash%3Abase64%3A5%5D!sass-loader?sourceMap=true&includePaths%5B%5D=app%2Fassets%2Fstylesheets&includePaths%5B%5D=app%2Fassets%2Fstylesheets%2Flegacy'
```
## why?

Say you have multiple loaders being applied to the same file format, and you are 
using the object syntax for specifying the loader query params (because it's more 
composable than the string form), but then you need to pass them to a plugin which 
only understands loaders in their string form (ExtractTextPlugin, I'm looking at you)...

```js
[
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: 'css-loader',
    query: {
      modules: true,
      sourceMap: devBuild,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
      loader: 'sass-loader',
      query: {
        sourceMap: devBuild,
        includePaths: [
          path.resolve('app/assets/stylesheets'),
          path.resolve('app/assets/stylesheets/legacy'),
        ],
      },
    },
  }
]
```

Instead, make a combined loader like so:
```js
{
  test: /\.scss$/,
  exclude: /node_modules/,
  // multiple css loaders are combined into one because ExtractTextPlugin 
  // only understands loaders in string form :(
  loader: combineLoaders([
    {
      loader: 'css-loader',
      query: {
        modules: true,
        sourceMap: devBuild,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
    {
      loader: 'sass-loader',
      query: {
        sourceMap: devBuild,
        includePaths: [
          path.resolve('app/assets/stylesheets'),
          path.resolve('app/assets/stylesheets/legacy'),
        ],
      },
    },
  ]),
}
```

### Changelog

- 2.0.1 - add support for webpack2 loader "options" (with fallback to "query")
- 2.0.0 - no longer uri-encodes loader params
- 1.0.0 - initial release
