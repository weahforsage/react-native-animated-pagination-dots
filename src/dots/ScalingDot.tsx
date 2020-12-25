import React from 'react';
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface ScalingDotProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotScale?: number;
}

const { width } = Dimensions.get('screen');

const ScalingDot = ({
  scrollX,
  data,
  dotStyle,
  containerStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotScale,
}: ScalingDotProps) => {
  const defaultProps = {
    inActiveDotColor: inActiveDotColor || dotStyle.backgroundColor.toString(),
    animationType: 'scale',
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    activeDotScale: activeDotScale || 1.4,
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const colour = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotColor,
            dotStyle.backgroundColor.toString(),
            defaultProps.inActiveDotColor,
          ],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotOpacity,
            1,
            defaultProps.inActiveDotOpacity,
          ],
          extrapolate: 'clamp',
        });
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [1, defaultProps.activeDotScale, 1],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[
              styles.dotStyle,
              { opacity },
              { transform: [{ scale }] },
              dotStyle,
              { backgroundColor: colour },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    backgroundColor: '#347af0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ScalingDot;
