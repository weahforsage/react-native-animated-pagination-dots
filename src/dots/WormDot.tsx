import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { Line, Svg } from 'react-native-svg';

export interface WormProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  scrollOffset: Animated.Value;
  dotSize?: number;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  dotContainerStyle?: ViewStyle;
  slidingIndicatorStyle?: ViewStyle;
  marginHorizontal?: number;
}

const { width } = Dimensions.get('screen');
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const Worm = ({
  scrollX,
  data,
  dotSize,
  containerStyle,
  dotStyle,
  slidingIndicatorStyle,
  marginHorizontal,
  scrollOffset,
}: WormProps) => {
  const defaultProps = {
    dotSize: dotSize || 12,
    marginHorizontal: marginHorizontal || 3,
  };
  const translateBack = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, width, width * 2];
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
    <View
      style={[
        { height: defaultProps.dotSize },
        styles.containerStyle,
        containerStyle,
      ]}
    >
      {data.map((_item, key) => {
        return (
          <View
            key={key}
            style={[
              {
                width: defaultProps.dotSize,
                height: defaultProps.dotSize,
                marginHorizontal: defaultProps.marginHorizontal,
                borderRadius: defaultProps.dotSize / 2,
                zIndex: 1000,
              },
              styles.dotStyle,
              dotStyle,
            ]}
          />
        );
      })}
      <AnimatedSvg
        style={[
          slidingIndicatorStyle,
          {
            position: 'absolute',
          },
        ]}
      >
        <AnimatedLine
          x1={translateFront}
          y1={defaultProps.dotSize / 2}
          x2={translateBack}
          y2={defaultProps.dotSize / 2}
          stroke="white"
          strokeWidth={defaultProps.dotSize}
          strokeLinecap="round"
          translateX={defaultProps.marginHorizontal}
        />
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    backgroundColor: '#000',
    opacity: 0.3,
  },
  slidingIndicatorStyle: {
    backgroundColor: '#347af0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Worm;
