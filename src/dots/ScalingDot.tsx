import React from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
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
  activeDotColor?: string;
}

const ScalingDot = ({
  scrollX,
  data,
  dotStyle,
  containerStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotScale,
  activeDotColor,
}: ScalingDotProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    inActiveDotColor: inActiveDotColor || '#347af0',
    activeDotColor: activeDotColor || '#347af0',
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
            defaultProps.activeDotColor,
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
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ScalingDot;
