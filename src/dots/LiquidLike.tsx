import React from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { Line, Svg } from 'react-native-svg';
export interface LiquidLikeProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  scrollOffset: Animated.Value;
  containerStyle?: ViewStyle;
  dotSize?: number;
  marginHorizontal?: number;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotColor?: string;
  wormDot?: boolean;
  strokeWidth?: number;
  bigHead?: boolean;
  bigHeadScale?: number;
}

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const LiquidLike = ({
  scrollX,
  data,
  dotSize,
  marginHorizontal,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotColor,
  containerStyle,
  scrollOffset,
  wormDot,
  bigHead,
  strokeWidth,
  bigHeadScale,
}: LiquidLikeProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    dotSize: dotSize || 12,
    marginHorizontal: marginHorizontal || 6,
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    inActiveDotColor: inActiveDotColor || '#000',
    activeDotColor: activeDotColor || '#fff',
    wormDot: wormDot || false,
    bigHead: bigHead || false,
    strokeWidth: strokeWidth || 8,
    bigHeadScale: bigHeadScale || 1,
  };
  const inputRange = [0, width, width * 2];
  const translateBack = React.useRef(new Animated.Value(0)).current;
  Animated.timing(translateBack, {
    toValue: scrollOffset.interpolate({
      inputRange: [0, width],
      outputRange: [
        defaultProps.dotSize / 2,
        defaultProps.dotSize +
          defaultProps.marginHorizontal +
          (defaultProps.marginHorizontal + defaultProps.dotSize / 2),
      ],
    }),
    duration: 100,
    useNativeDriver: true,
  }).start();
  const translateFront = scrollX.interpolate({
    inputRange,
    outputRange: [
      defaultProps.dotSize / 2,
      defaultProps.dotSize +
        defaultProps.marginHorizontal * 2 +
        defaultProps.dotSize / 2,
      (defaultProps.dotSize + defaultProps.marginHorizontal * 2) * 2 +
        defaultProps.dotSize / 2,
    ],
  });
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            style={{
              opacity: defaultProps.inActiveDotOpacity,
              width: defaultProps.dotSize,
              height: defaultProps.dotSize,
              borderRadius: defaultProps.dotSize / 2,
              marginHorizontal: defaultProps.marginHorizontal,
              backgroundColor: defaultProps.inActiveDotColor,
            }}
          />
        );
      })}
      {!wormDot ? (
        <Animated.View
          style={[
            {
              width: defaultProps.dotSize,
              height: defaultProps.dotSize,
              marginHorizontal: defaultProps.marginHorizontal,
              backgroundColor: defaultProps.activeDotColor,
              borderRadius: defaultProps.dotSize,
            },
            styles.svg,
            {
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange,
                    outputRange: [
                      0,
                      defaultProps.dotSize + defaultProps.marginHorizontal * 2,
                      (defaultProps.dotSize +
                        defaultProps.marginHorizontal * 2) *
                        2,
                    ],
                  }),
                },
                !bigHead
                  ? {
                      scale: Animated.modulo(
                        Animated.modulo(Animated.divide(scrollX, width), width),
                        1
                      ).interpolate({
                        inputRange: [0, 0.1, 0.9, 1],
                        outputRange: [1, 0, 0, 1],
                      }),
                    }
                  : {
                      scale: defaultProps.bigHeadScale,
                    },
              ],
            },
          ]}
        />
      ) : null}

      <AnimatedSvg style={styles.svg}>
        <AnimatedLine
          x1={translateFront}
          y1={defaultProps.dotSize / 2}
          x2={translateBack}
          y2={defaultProps.dotSize / 2}
          stroke={defaultProps.activeDotColor}
          strokeWidth={defaultProps.strokeWidth}
          strokeLinecap="round"
          translateX={defaultProps.marginHorizontal}
        />
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
  },
  svg: {
    position: 'absolute',
  },
});

export default LiquidLike;
