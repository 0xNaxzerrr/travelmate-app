import React, { useState } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';

const LazyImage = ({ source, style }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={style}>
      <Image
        source={source}
        style={[style, { display: loading ? 'none' : 'flex' }]}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator
          style={[style, { position: 'absolute' }]}
          size="large"
        />
      )}
    </View>
  );
};

export default LazyImage;