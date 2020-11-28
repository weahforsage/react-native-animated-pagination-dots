import React from 'react';
import {View, Dimensions, StyleSheet, Animated} from "react-native";
import {SlidingDotProps} from './types'

const {width} = Dimensions.get('screen')
const SlidingDot = ({
                        scrollX,
                        data,
                        dotSize,
                        containerStyle,
                        paginationDotStyle,
                        paginationIndicatorStyle,
                        marginHorizontal,
                    }: SlidingDotProps) => {
    const defaultProps = {
        marginHorizontal: marginHorizontal || 3
    }
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-dotSize + defaultProps.marginHorizontal * 2, 0, dotSize + defaultProps.marginHorizontal * 2],
    });


    return (
        <View style={[{height: dotSize}, styles.containerStyle, containerStyle]}>
            <Animated.View
                style={[
                    {
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize / 2
                    },
                    styles.paginationIndicator,
                    {
                        position: 'absolute',
                        marginHorizontal: marginHorizontal,
                        transform: [{translateX}],
                    },
                    paginationIndicatorStyle,

                ]}
            />
            {data.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={[{
                            width: dotSize,
                            height: dotSize,
                            marginHorizontal: defaultProps.marginHorizontal,
                            borderRadius: dotSize / 2
                        }, styles.paginationDot, paginationDotStyle,]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        alignSelf: "center"
    },
    paginationDot: {
        backgroundColor: '#347af0',
        opacity: 0.4,
    },
    paginationIndicator: {
        backgroundColor: '#347af0',
        zIndex: 99,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
});

export default SlidingDot;