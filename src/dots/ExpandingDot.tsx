import React from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
export interface ExpandingDotProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  containerStyle: ViewStyle;
  dotStyle: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  expandingDotWidth?: number;
  activeDotColor?: string;
  itemWidth?: number;
}

const ExpandingDot = ({
  scrollX,
  data,
  dotStyle,
  containerStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  expandingDotWidth,
  activeDotColor,
  itemWidth,
}: ExpandingDotProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    inActiveDotColor: inActiveDotColor || '#000',
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    expandingDotWidth: expandingDotWidth || 20,
    dotWidth: (dotStyle.width as number) || 10,
    activeDotColor: activeDotColor || '#347af0',
  };

  return (
    <View
      pointerEvents={'none'}
      style={[styles.containerStyle, containerStyle]}
    >
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * (itemWidth || width),
          index * (itemWidth || width),
          (index + 1) * (itemWidth || width),
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
        const expand = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.dotWidth,
            defaultProps.expandingDotWidth,
            defaultProps.dotWidth,
          ],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[
              styles.dotStyle,
              dotStyle,
              { width: expand },
              { opacity },
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

export default ExpandingDot;
