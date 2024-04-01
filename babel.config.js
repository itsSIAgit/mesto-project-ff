const presets = [
  ['@babel/preset-env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '100',
      firefox: '100',
      chrome: '100',
      safari: '15.5'
    },

    // использовать полифилы для браузеров из свойства target
    // по умолчанию babel использует полифилы библиотеки core-js
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };