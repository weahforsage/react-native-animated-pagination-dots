import React from 'react';
import {
  View,
  Animated,
  Dimensions,
  ViewStyle,
  StyleSheet,
} from 'react-native';

export interface LiquidLikeProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  containerStyle: ViewStyle;
  dotSize?: number;
  dotSpacing?: number;
  lineDistance?: number;
  lineHeight?: number;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotColor?: string;
}

const { width } = Dimensions.get('screen');
const LiquidLike = ({
  scrollX,
  data,
  dotSize,
  dotSpacing,
  lineDistance,
  lineHeight,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotColor,
  containerStyle,
}: LiquidLikeProps) => {
  const defaultProps = {
    dotSize: dotSize || 12,
    dotSpacing: dotSpacing || 6,
    lineDistance: lineDistance || 8,
    lineHeight: lineHeight || 4,
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    inActiveDotColor: inActiveDotColor || '#000',
    activeDotColor: activeDotColor || '#347af0',
  };
  const inputRange = [0, width, width * 2];
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((_item, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              opacity: defaultProps.inActiveDotOpacity,
              width: defaultProps.dotSize,
              height: defaultProps.dotSize,
              borderRadius: defaultProps.dotSize / 2,
              marginHorizontal: defaultProps.dotSpacing,
              backgroundColor: defaultProps.inActiveDotColor,
            }}
          />
        );
      })}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: defaultProps.dotSize / defaultProps.lineHeight,
            height: defaultProps.dotSize / defaultProps.lineHeight,
            top:
              defaultProps.dotSize / 2 -
              defaultProps.dotSize / (defaultProps.lineHeight * 2),
            left:
              defaultProps.dotSize / 2 -
              defaultProps.dotSize / (defaultProps.lineHeight * 2),
            marginHorizontal: defaultProps.dotSpacing,
            backgroundColor: defaultProps.activeDotColor,
          },
          {
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange,
                  outputRange: [
                    0,
                    defaultProps.dotSize + defaultProps.dotSpacing * 2,
                    (defaultProps.dotSize + defaultProps.dotSpacing * 2) * 2,
                  ],
                }),
              },
              {
                scaleX: Animated.modulo(
                  Animated.modulo(Animated.divide(scrollX, width), width),
                  1
                ).interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, defaultProps.lineDistance, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: defaultProps.dotSize,
            height: defaultProps.dotSize,
            marginHorizontal: defaultProps.dotSpacing,
            backgroundColor: defaultProps.activeDotColor,
            borderRadius: defaultProps.dotSize,
          },
          {
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange,
                  outputRange: [
                    0,
                    defaultProps.dotSize + defaultProps.dotSpacing * 2,
                    (defaultProps.dotSize + defaultProps.dotSpacing * 2) * 2,
                  ],
                }),
              },
              {
                scale: Animated.modulo(
                  Animated.modulo(Animated.divide(scrollX, width), width),
                  1
                ).interpolate({
                  inputRange: [0, 0.1, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
  },
});

export default LiquidLike;
