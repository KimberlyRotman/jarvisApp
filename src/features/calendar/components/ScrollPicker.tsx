import { AppColors } from '@src/shared/utils/colors';
import React, { useCallback, useRef } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 3;

type Props = {
  values: string[];
  selectedIndex: number;
  onValueChange: (index: number) => void;
  width?: number;
};

export default function ScrollPicker({ values, selectedIndex, onValueChange, width = 70 }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(index, values.length - 1));
      if (clamped !== selectedIndex) {
        onValueChange(clamped);
      }
      scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
    },
    [values.length, selectedIndex, onValueChange],
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      const offsetY = e.nativeEvent.contentOffset.y;
      timerRef.current = setTimeout(() => {
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const clamped = Math.max(0, Math.min(index, values.length - 1));
        if (clamped !== selectedIndex) {
          onValueChange(clamped);
        }
        scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
      }, 100);
    },
    [values.length, selectedIndex, onValueChange],
  );

  return (
    <View style={[pickerStyles.container, { width }]}>
      <View style={pickerStyles.highlight} pointerEvents="none" />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
        }}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentOffset={{ x: 0, y: selectedIndex * ITEM_HEIGHT }}
        nestedScrollEnabled
      >
        {values.map((val, i) => (
          <View key={i} style={pickerStyles.item}>
            <Text
              style={[
                pickerStyles.itemText,
                i === selectedIndex && pickerStyles.itemTextSelected,
              ]}
            >
              {val}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const pickerStyles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  highlight: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 237, 0, 0.12)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: AppColors.accentYellow,
    zIndex: 1,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: AppColors.gray,
    fontSize: 18,
  },
  itemTextSelected: {
    color: AppColors.white,
    fontWeight: '700',
    fontSize: 20,
  },
});
