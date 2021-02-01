import React from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
export interface SlidingBorderProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  dotSize?: number;
  borderPadding?: number;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  dotContainerStyle?: ViewStyle;
  slidingIndicatorStyle?: ViewStyle;
}

const SlidingBorder = ({
  scrollX,
  data,
  dotSize,
  containerStyle,
  dotStyle,
  dotContainerStyle,
  slidingIndicatorStyle,
  borderPadding,
}: SlidingBorderProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    dotSize: dotSize || 24,
    borderPadding: borderPadding || -5,
  };
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [
      -defaultProps.dotSize + defaultProps.borderPadding,
      0,
      defaultProps.dotSize + defaultProps.borderPadding,
    ],
  });

  return (
    <View
      style={[
        { height: defaultProps.dotSize },
        styles.container,
        containerStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            width: defaultProps.dotSize + defaultProps.borderPadding,
            height: defaultProps.dotSize + defaultProps.borderPadding,
            borderRadius:
              (defaultProps.dotSize + defaultProps.borderPadding) / 2,
          },
          styles.slidingIndicatorStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            position: 'absolute',
            transform: [{ translateX }],
          },
          slidingIndicatorStyle,
        ]}
      />
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            style={[
              {
                width: defaultProps.dotSize + defaultProps.borderPadding,
              },
              styles.dotContainerStyle,
              dotContainerStyle,
            ]}
          >
            <View
              style={[
                {
                  width: defaultProps.dotSize / 2,
                  height: defaultProps.dotSize / 2,
                  borderRadius: defaultProps.dotSize / 4,
                },
                styles.dotStyle,
                dotStyle,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    backgroundColor: '#347af0',
  },
  dotContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingIndicatorStyle: {
    borderWidth: 1,
    borderColor: '#347af0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default SlidingBorder;
