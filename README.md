# Animated Dots
<img src="https://raw.githubusercontent.com/weahforsage/react-native-animated-pagination-dots/main/example/AnimatedDots.gif" height="500">

FlatList animated pagination dots. Some (maybe all)
 ideas and credits goes to
 [Catalin Miron](https://www.youtube.com/channel/UCTcH04SRuyedaSuuQVeAcdg) 👏.

This package does not use any dependencies but Animated API.

Few days ago I made a reddit [post](https://www.reddit.com/r/reactnative/comments/jxwo54/i_made_a_app_intro_slider_using_rn_animated_and/),
and people requested to open source it.



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

##Props
###Expanding Dot
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
<!-- DivTable.com -->
###Scaling Dot
###Sliding Dot
###Sliding Border

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
