import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

type WheelPickerProps = {
  data: string[];
  visibleCount?: number;
  itemHeight?: number;
  onScrollEnd?: (item: string, index: number) => void;
};

export default function WheelView({
  data,
  visibleCount = 3,
  itemHeight = 44,
  onScrollEnd,
}: WheelPickerProps) {
  const scrollRef = useRef<ScrollView>(null);
  const centerIndex = Math.floor(visibleCount / 2);

  const [currentIndex, setCurrentIndex] = useState(centerIndex);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: centerIndex * itemHeight,
      animated: false,
    });
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    setCurrentIndex(index);
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    scrollRef.current?.scrollTo({y: index * itemHeight, animated: true});

    if (onScrollEnd && index >= 0 && index < data.length) {
      onScrollEnd(data[index], index);
    }
  };

  return (
    <View style={{height: itemHeight * visibleCount, overflow: 'hidden'}}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: itemHeight * centerIndex,
          paddingBottom: itemHeight * centerIndex,
        }}>
        {data.map((item, i) => (
          <View key={i} style={[styles.item, {height: itemHeight}]}>
            <Text
              style={[
                styles.text,
                i === currentIndex
                  ? {color: '#333', fontSize: 18}
                  : {color: '#999', fontSize: 16},
              ]}>
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* 中心标线 */}
      <View
        style={{
          position: 'absolute',
          top: itemHeight * centerIndex,
          left: 0,
          right: 0,
          height: itemHeight,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#ccc',
          pointerEvents: 'none',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
