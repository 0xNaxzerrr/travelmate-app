module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Si vous utilisez des plugins supplémentaires, ajoutez-les ici
      // Par exemple : 
      // 'react-native-reanimated/plugin'
    ]
  };
};
