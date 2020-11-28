import React from 'react';
import { View, Dimensions, StyleSheet, Animated } from 'react-native';
import type { SlidingBorderProps } from '../../lib/typescript/src';

const { width } = Dimensions.get('screen');
const SlidingBorder = ({
  scrollX,
  data,
  dotSize,
  containerStyle,
  paginationDotStyle,
  paginationDotContainerStyle,
  paginationIndicatorStyle,
  borderPadding,
}: SlidingBorderProps) => {
  const defaultProps = {
    dotStyle: dotSize || 26,
    borderPadding: borderPadding || -5,
  };
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [
      -defaultProps.dotStyle + defaultProps.borderPadding,
      0,
      defaultProps.dotStyle + defaultProps.borderPadding,
    ],
  });

  return (
    <View
      style={[
        { height: defaultProps.dotStyle },
        styles.container,
        containerStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            width: defaultProps.dotStyle + defaultProps.borderPadding,
            height: defaultProps.dotStyle + defaultProps.borderPadding,
            borderRadius:
              (defaultProps.dotStyle + defaultProps.borderPadding) / 2,
          },
          styles.paginationIndicator,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            position: 'absolute',
            transform: [{ translateX }],
          },
          paginationIndicatorStyle,
        ]}
      />
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            style={[
              {
                width: defaultProps.dotStyle + defaultProps.borderPadding,
              },
              styles.paginationDotContainer,
              paginationDotContainerStyle,
            ]}
          >
            <View
              style={[
                {
                  width: defaultProps.dotStyle / 2,
                  height: defaultProps.dotStyle / 2,
                  borderRadius: defaultProps.dotStyle / 4,
                },
                styles.paginationDot,
                paginationDotStyle,
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
  paginationDot: {
    backgroundColor: '#347af0',
  },
  paginationDotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    borderWidth: 1,
    borderColor: '#347af0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default SlidingBorder;
