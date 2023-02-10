export default {
  input: 'src/FreshStorage.js',
  output: [{
      file: 'dist/freshStorage.js',
      format: 'umd',
      name: 'freshStorage'
  },
  {
      file: 'dist/main.js',
      format: 'es',
      name: 'freshStorage'
  }]
};
