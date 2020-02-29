/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const pkg = require('../package');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MODE = process.env.NODE_ENV;
const dependencies = Object.keys(pkg.dependencies).map(x => x);

const genPackage = () => ({
  name: 'functions',
  private: true,
  main: 'index.js',
  license: 'MIT',
  engines: {
    node: '10',
  },
  dependencies: dependencies.reduce(
    (acc, name) =>
      Object.assign({}, acc, {
        [name]: pkg.dependencies[name] || pkg.devDependencies[name],
      }),
    {}
  ),
});

module.exports = {
  mode: MODE === 'dev' ? 'development' : 'production',
  entry: path.resolve(__dirname, 'main.ts'),
  output: {
    path: __dirname + '/../functions',
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(ts)$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve(__dirname), 'node_modules'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  externals: dependencies.reduce(
    (acc, name) => Object.assign({}, acc, { [name]: true }),
    {}
  ),
  plugins: [new GenerateJsonPlugin('package.json', genPackage())],
};
