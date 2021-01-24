# React Native Animated Pagination Dots
<img src="https://raw.githubusercontent.com/weahforsage/react-native-animated-pagination-dots/main/example/Github_cover_preview.gif" alt="Animated Dots Example">
<img src="https://raw.githubusercontent.com/weahforsage/react-native-animated-pagination-dots/main/example/AnimatedDots.gif" height="400" alt="Animated Dots Example">

FlatList animated pagination dots. Some (maybe all)
 ideas and credits goes to
 [Catalin Miron](https://www.youtube.com/channel/UCTcH04SRuyedaSuuQVeAcdg) 👏.

<strike>This package does not use any dependencies but Animated API.</strike>
Now uses `react-native-svg` for the LiquidLike

Few days ago I made a reddit [post](https://www.reddit.com/r/reactnative/comments/jxwo54/i_made_a_app_intro_slider_using_rn_animated_and/),
and people requested to open source it.

For more Copy & Paste stuff, go check [example](https://github.com/weahforsage/react-native-animated-pagination-dots/blob/main/example/src/App.tsx) folder

## TODO
<ul>
    <li>
        iOS Device Test
    </li>
    <li>
        <strike>Worm Dot Indicator</strike>
    </li>
    <li>
        <strike>Liquid Like Indicator</strike>
    </li>
    <li>
        <strike>Next, Prev, Skip button implementation</strike>
    </li>
    <li>
        Landscape test
    </li>
     <li>
        Dots direction such as Vertical and Horizontal
     </li>
</ul>

## Installation

```sh
npm install react-native-animated-pagination-dots
```

## Usage

```js
import {ExpandingDot} from "react-native-animated-pagination-dots";

const SLIDER_DATA = [
  {
    key: '1',
    title: 'App showcase ✨',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    key: '2',
    title: 'Introduction screen 🎉',
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
  },
];
  const scrollX = React.useRef(new Animated.Value(0)).current;

<FlatList
    data={SLIDER_DATA}
    keyExtractor={keyExtractor}
    showsHorizontalScrollIndicator={false}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      {
        useNativeDriver: false,
      }
    )}
    pagingEnabled
    horizontal
    decelerationRate={'normal'}
    scrollEventThrottle={16}
    renderItem={renderItem}
/>

<ExpandingDot
    data={SLIDER_DATA}
    expandingDotWidth={30}
    scrollX={scrollX}
    inActiveDotOpacity={0.6}
    dotStyle={{
        width: 10,
        height: 10,
        backgroundColor: '#347af0',
        borderRadius: 5,
        marginHorizontal: 5
    }}
    containerStyle={{
        top: 30,
    }}
/>
```
### Button Navigation Example
```js
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { LiquidLike } from 'react-native-animated-pagination-dots';

const { width } = Dimensions.get('screen');

const data = [
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#7bcf6e',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#4654a7',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#7370cf',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#db4747',
  },
];

const imageW = width * 0.7;
const imageH = imageW * 1.4;

const ButtonNavigation = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  //Current item index of flatlist
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const gotoNextPage = () => {
    if (activeIndex + 1 < data.length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };
  const gotoPrevPage = () => {
    if (activeIndex !== 0) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };
  const skipToStart = () => {
    // @ts-ignore
    flatListRef.current.scrollToIndex({
      index: data.length - 1,
      animated: true,
    });
  };
  //Flatlist props that calculates current item index
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  const renderItem = React.useCallback(({ item }) => {
    return (
      <View style={[styles.itemContainer]}>
        <Animated.Image
          style={{
            width: imageW,
            height: imageH,
            borderRadius: 20,
            resizeMode: 'cover',
          }}
          source={{ uri: item.image }}
        />
      </View>
    );
  }, []);

  return (
    <View style={[styles.container]}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const colorFade = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.View
              key={index}
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: item.backgroundColor, opacity: colorFade },
              ]}
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
            useNativeDriver: false,
          }
        )}
      />
      <LiquidLike
        data={data}
        scrollX={scrollX}
        dotSize={18}
        dotSpacing={6}
        lineDistance={7}
        lineHeight={4}
        inActiveDotOpacity={0.2}
        activeDotColor={'#fff'}
        containerStyle={{ flex: 1 }}
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
  itemContainer: {
    flex: 1,
    width,
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

```

## Props


### Expanding Dot


<table>
<tbody>
<tr>
<td><strong>Name&nbsp;</strong></td>
<td><strong>Type&nbsp;</strong></td>
<td><strong>Default&nbsp;</strong></td>
<td><strong>Description&nbsp;</strong></td>
</tr>
<tr>
<td>inActiveDotOpacity</td>
<td>number</td>
<td>0.5</td>
<td>In active dot opacity</td>
</tr>
<tr>
<td>expandingDotWidth</td>
<td>number</td>
<td>20</td>
<td>Active dot width</td>
</tr>
<tr>
<td>data</td>
<td>Array&lt;Object&gt;</td>
<td>required</td>
<td>Array which is used for flatlist iteration</td>
</tr>
<tr>
<td>scrollX</td>
<td>Animated.Value</td>
<td>required</td>
<td>
<p>Gestures, like panning or scrolling, and other events can map directly to animated values using Animated.event().</p>
<p>For example, when working with horizontal scrolling gestures, you would do the following in order to map event.nativeEvent.contentOffset.x to scrollX (an Animated.Value)</p>
</td>
</tr>
<tr>
<td>dotStyle</td>
<td>ViewStyle</td>
<td>
<pre>width: 10,<br />height: 10,<br />backgroundColor: '#347af0',<br />borderRadius: 5,<br />marginHorizontal: 5</pre>
</td>
<td>
<p>Basic styling for each dot.</p>
</td>
</tr>
<tr>
<td>containerStyle</td>
<td>ViewStyle</td>
<td>
<pre>position: "absolute",<br />bottom: 20,<br />flexDirection: "row",</pre>
</td>
<td>
<p>Basic styling for dots container.</p>
</td>
</tr>
</tbody>
</table>


### Scaling Dot
<table>
<tbody>
<tr>
<td><strong>Name&nbsp;</strong></td>
<td><strong>Type&nbsp;</strong></td>
<td><strong>Default&nbsp;</strong></td>
<td><strong>Description&nbsp;</strong></td>
</tr>
<tr>
<td>activeDotScale</td>
<td>number</td>
<td>1.4</td>
<td>Active dot scale number</td>
</tr>
<tr>
<td>inActiveDotOpacity</td>
<td>number</td>
<td>0.5</td>
<td>In active dot opacity</td>
</tr>
<tr>
<td>data</td>
<td>Array&lt;Object&gt;</td>
<td>required</td>
<td>Array which is used for flatlist iteration</td>
</tr>
<tr>
<td>scrollX</td>
<td>Animated.Value</td>
<td>required</td>
<td>
<p>Gestures, like panning or scrolling, and other events can map directly to animated values using Animated.event().</p>
<p>For example, when working with horizontal scrolling gestures, you would do the following in order to map event.nativeEvent.contentOffset.x to scrollX (an Animated.Value)</p>
</td>
</tr>
<tr>
<td>dotStyle</td>
<td>ViewStyle</td>
<td>
<pre>width: 10,<br />height: 10,<br />backgroundColor: '#347af0',<br />borderRadius: 5,<br />marginHorizontal: 5</pre>
</td>
<td>
<p>Basic styling for each dot.</p>
</td>
</tr>
<tr>
<td>containerStyle</td>
<td>ViewStyle</td>
<td>
<pre>position: "absolute",<br />bottom: 20,<br />flexDirection: "row",</pre>
</td>
<td>
<p>Basic styling for dots container.</p>
</td>
</tr>
</tbody>
</table>

### Sliding Dot
<table>
<tbody>
<tr>
<td><strong>Name&nbsp;</strong></td>
<td><strong>Type&nbsp;</strong></td>
<td><strong>Default&nbsp;</strong></td>
<td><strong>Description&nbsp;</strong></td>
</tr>
<tr>
<td>dotSize</td>
<td>number</td>
<td>12</td>
<td>Each dot size !<strong>IMPORTANT</strong> Do not adjust dot size through dotStyle,&nbsp;otherwise it'll&nbsp;misbehave</td>
</tr>
<tr>
<td>marginHorizontal</td>
<td>number</td>
<td>3</td>
<td>Margin between dots&nbsp;!<strong>IMPORTANT</strong> Do not adjust dot <strong>margin</strong> through dotStyle, otherwise it'll&nbsp;misbehave</td>
</tr>
<tr>
<td>data</td>
<td>Array&lt;Object&gt;</td>
<td>required</td>
<td>Array which is used for flatlist iteration</td>
</tr>
<tr>
<td>scrollX</td>
<td>Animated.Value</td>
<td>required</td>
<td>
<p>Gestures, like panning or scrolling, and other events can map directly to animated values using Animated.event().</p>
<p>For example, when working with horizontal scrolling gestures, you would do the following in order to map event.nativeEvent.contentOffset.x to scrollX (an Animated.Value)</p>
</td>
</tr>
<tr>
<td>dotStyle</td>
<td>ViewStyle</td>
<td>
<pre>backgroundColor: '#347af0',<br />opacity: 0.4,</pre>
</td>
<td>
<p>Basic styling for each dot.</p>
</td>
</tr>
<tr>
<td>containerStyle</td>
<td>ViewStyle</td>
<td>
<pre>position: "absolute",<br />bottom: 30,<br />flexDirection: "row",<br />alignSelf: "center"</pre>
</td>
<td>
<p>Basic styling for dots container.</p>
</td>
</tr>
<tr>
<td>slidingIndicatorStyle</td>
<td>ViewStyle</td>
<td>
<pre>backgroundColor: '#347af0',<br />zIndex: 99,<br />alignItems: 'center',<br />justifyContent: 'center',<br />alignSelf: 'center'</pre>
</td>
<td>
<p>Basic styling for Sliding indicator dot.</p>
</td>
</tr>
</tbody>
</table>

### Sliding Border
<table>
<tbody>
<tr>
<td><strong>Name&nbsp;</strong></td>
<td><strong>Type&nbsp;</strong></td>
<td><strong>Default&nbsp;</strong></td>
<td><strong>Description&nbsp;</strong></td>
</tr>
<tr>
<td>dotSize</td>
<td>number</td>
<td>24</td>
<td>Each dot size !<strong>IMPORTANT</strong> Do not adjust dot size through dotStyle,&nbsp;otherwise it'll&nbsp;misbehave</td>
</tr>
<tr>
<td>borderPadding</td>
<td>number</td>
<td>-5</td>
<td>Padding between dot and border. Should be good between -5 and 3, test it out.</td>
</tr>
<tr>
<td>data</td>
<td>Array&lt;Object&gt;</td>
<td>required</td>
<td>Array which is used for flatlist iteration</td>
</tr>
<tr>
<td>scrollX</td>
<td>Animated.Value</td>
<td>required</td>
<td>
<p>Gestures, like panning or scrolling, and other events can map directly to animated values using Animated.event().</p>
<p>For example, when working with horizontal scrolling gestures, you would do the following in order to map event.nativeEvent.contentOffset.x to scrollX (an Animated.Value)</p>
</td>
</tr>
<tr>
<td>dotStyle</td>
<td>ViewStyle</td>
<td>
<pre>backgroundColor: '#347af0'</pre>
</td>
<td>
<p>Basic styling for each dot.</p>
</td>
</tr>
<tr>
<td>containerStyle</td>
<td>ViewStyle</td>
<td>
<pre>position: "absolute",<br />bottom: 20,<br />flexDirection: "row",<br />alignSelf: "center"</pre>
</td>
<td>
<p>Basic styling for dots container.</p>
</td>
</tr>
<tr>
<td>slidingIndicatorStyle</td>
<td>ViewStyle</td>
<td>
<pre>borderWidth: 1,<br />borderColor: '#347af0',<br />alignItems: 'center',<br />justifyContent: 'center',<br />alignSelf: 'center'</pre>
</td>
<td>
<p>Basic styling for sliding bordered dot style.</p>
</td>
</tr>
</tbody>
</table>

### Liquid Like
<table>
<tbody>
<tr>
<td><strong>Name&nbsp;</strong></td>
<td><strong>Type&nbsp;</strong></td>
<td><strong>Default&nbsp;</strong></td>
<td><strong>Description&nbsp;</strong></td>
</tr>
<tr>
<td>dotSize</td>
<td>number</td>
<td>12</td>
<td>Each dot size </td>
</tr>
<tr>
<td>dotSpacing</td>
<td>number</td>
<td>3</td>
<td>Margin between dots</td>
</tr>
<tr>
<td>inActiveDotOpacity</td>
<td>number</td>
<td>0.5</td>
<td>In active dot opacity</td>
</tr>
<tr>
<td>inActiveDotColor</td>
<td>string</td>
<td>#000</td>
<td>In active dot color</td>
</tr>
<tr>
<td>activeDotColor</td>
<td>string</td>
<td>#347af0</td>
<td>Active dot color</td>
</tr>
<tr>
<td>data</td>
<td>Array&lt;Object&gt;</td>
<td>required</td>
<td>Array which is used for flatlist iteration</td>
</tr>
<tr>
<td>scrollX</td>
<td>Animated.Value</td>
<td>required</td>
<td>
<p>Gestures, like panning or scrolling, and other events can map directly to animated values using Animated.event().</p>
<p>For example, when working with horizontal scrolling gestures, you would do the following in order to map event.nativeEvent.contentOffset.x to scrollX (an Animated.Value)</p>
</td>
</tr>
<tr>
<td>lineHeight</td>
<td>number</td>
<td>
<p>4</p>
</td>
<td>
<p>Line height for sliding dot</p>
</td>
</tr>
<tr>
<td>lineDistance</td>
<td>number</td>
<td>
<p>8</p>
</td>
<td>
<p>Line travel distance between dots</p>
</td>
</tr>
<tr>
<td>containerStyle</td>
<td>ViewStyle</td>
<td>
<pre>flexDirection: "row"</pre>
</td>
<td>
<p>Basic styling for dots container.</p>
</td>
</tr>
</tbody>
</table>


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
