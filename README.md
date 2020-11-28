# react-native-animated-pagination-dots

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

##Preview
[Example of Dots]()
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
