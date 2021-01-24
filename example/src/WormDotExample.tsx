import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { LiquidLike } from 'react-native-animated-pagination-dots';

const { width } = Dimensions.get('screen');

const data = [
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  },
];

const imageW = width * 0.7;
const imageH = imageW * 1.4;

const WormDotExample = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let scrollOffset = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  //Current item index of FlatList
  let flatListRef = React.useRef(null);
  const renderItem = React.useCallback(({ item }) => {
    return (
      <View style={[styles.itemContainer]}>
        <Animated.Image
          style={[
            {
              width: imageW,
              height: imageH,
            },
            styles.image,
          ]}
          source={{ uri: item.image }}
        />
      </View>
    );
  }, []);
  return (
    <View style={[styles.container]}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((_, key) => {
          return (
            <Animated.View
              key={key}
              style={[StyleSheet.absoluteFillObject, styles.backgroundFill]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        onMomentumScrollEnd={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollOffset } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      <LiquidLike
        data={data}
        scrollX={scrollX}
        scrollOffset={scrollOffset}
        strokeWidth={24}
        dotSize={24}
        marginHorizontal={8}
        inActiveDotOpacity={0.3}
        activeDotColor={'#fff'}
        containerStyle={{ bottom: 60 }}
        wormDot
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 20,
    resizeMode: 'cover',
  },
  backgroundFill: {
    backgroundColor: '#601fbc',
  },
  itemContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WormDotExample;
