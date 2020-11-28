import React from 'react';
import {View, Dimensions, Animated, StyleSheet} from 'react-native'
import {ExpandingDotProps} from "./types";


const {width} = Dimensions.get('screen')

const ExpandingDot = ({
                          scrollX,
                          data,
                          dotStyle,
                          containerStyle,
                          inActiveDotOpacity,
                          expandingDotWidth
                      }: ExpandingDotProps) => {


    const defaultProps = {
        animationType: 'scale',
        inActiveDotOpacity: inActiveDotOpacity || 0.5,
        expandingDotWidth: expandingDotWidth || 20,
        dotWidth: dotStyle.width as number || 10,
    }


    return (
        <View style={[styles.containerStyle, containerStyle]}>
            {data.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [defaultProps.inActiveDotOpacity, 1, defaultProps.inActiveDotOpacity],
                    extrapolate: 'clamp',
                })
                const expand = scrollX.interpolate({
                    inputRange,
                    outputRange: [defaultProps.dotWidth, defaultProps.expandingDotWidth, defaultProps.dotWidth],
                    extrapolate: 'clamp',
                })

                return (
                    <Animated.View
                        key={`dot-${index}`}
                        style={
                            [styles.dotStyle, dotStyle, {width: expand}, {opacity}]
                        }
                    >
                    </Animated.View>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
    },
    dotStyle: {
        width: 10,
        height: 10,
        backgroundColor: '#347af0',
        borderRadius: 5,
        marginHorizontal: 5
    }
})

export default ExpandingDot;