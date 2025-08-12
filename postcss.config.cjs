module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-custom-properties': { preserve: false },
    './postcss-fallback-shadow.cjs': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
      browsers: ['last 2 versions', 'chrome 49', 'ie 11', 'samsung 4']
    }
  }
}
