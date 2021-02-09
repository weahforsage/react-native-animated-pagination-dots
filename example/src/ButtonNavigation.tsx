import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { LiquidLike } from 'react-native-animated-pagination-dots';

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

const ButtonNavigation = () => {
  const { width } = useWindowDimensions();
  const imageW = width * 0.7;
  const imageH = imageW * 1.4;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let scrollOffset = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  //Current item index of FlatList
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const gotoNextPage = () => {
    const gotoNextIndex = () => {
      if (activeIndex === 0) {
        return width;
      } else if (activeIndex === data.length - 1) {
        return width * activeIndex;
      } else {
        return width * (activeIndex + 1);
      }
    };
    if (activeIndex + 1 < data.length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
    scrollOffset.setValue(gotoNextIndex());
  };
  const gotoPrevPage = () => {
    const gotoPrevIndex = () => {
      if (activeIndex === 0) {
        return 0;
      }
      return width * (activeIndex - 1);
    };
    if (activeIndex !== 0) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
    scrollOffset.setValue(gotoPrevIndex());
  };
  const skipToStart = () => {
    // @ts-ignore
    flatListRef.current.scrollToIndex({
      index: data.length - 1,
      animated: true,
    });
    scrollOffset.setValue(width * (data.length - 1));
  };
  //FlatList props that calculates current item index from viewableItems
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0]?.index);
  });
  const viewConfigRef = React.useRef({
    itemVisiblePercentThreshold: 50,
  });
  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <View style={[styles.itemContainer, { width }]}>
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
    },
    [imageH, imageW, width]
  );
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
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
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
        strokeWidth={6}
        dotSize={24}
        marginHorizontal={8}
        inActiveDotOpacity={0.3}
        activeDotColor={'#fff'}
      />
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => gotoPrevPage()}
        >
          <Text style={[styles.buttonText]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => gotoNextPage()}
        >
          <Text style={[styles.buttonText]}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => skipToStart()}>
          <Text style={[styles.buttonText]}>Skip</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#e71a44',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ButtonNavigation;
