import React, { useState } from 'react';
import { View, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent, useWindowDimensions } from 'react-native';
import tw from 'twrnc';

const HomeBannerSection = () => {
  const { width } = useWindowDimensions();

  const banners = [
    require('../assets/images/unnamed.webp'),
    require('../assets/images/unnamed-banner.webp'),
    require('../assets/images/9786325ef35b05c91053c663067481ff_screen.jpg'),
  ];

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // The parent container in index.tsx has a horizontal padding of 40 (px-5 = 20px each side)
  // We cap the max screen width to ensure banners don't stretch absurdly wide on tablets
  const effectiveScreenWidth = Math.min(width, 550);
  const availableWidth = effectiveScreenWidth - 40;

  // We subtract 24px so the next banner visually "peeks" in from the right edge
  const itemWidth = availableWidth - 24;
  const marginSpacing = 16; // corresponds to tw`mr-4`
  const snapInterval = itemWidth + marginSpacing;

  const onBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    // Safely avoid division by zero or NaN
    if (snapInterval > 0) {
      setActiveBannerIndex(Math.round(x / snapInterval));
    }
  };

  return (
    <View style={tw`mt-6 w-full max-w-[550px] self-center`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onBannerScroll}
        scrollEventThrottle={32}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        contentContainerStyle={tw`px-0`}
      >
        {banners.map((source, index) => (
          <View
            key={index}
            style={[
              tw`h-40 rounded-3xl overflow-hidden mr-4 shadow-sm bg-gray-100`,
              { width: itemWidth }
            ]}
          >
            <Image
              source={typeof source === 'string' ? { uri: source } : source}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <View style={tw`flex-row justify-center mt-3 h-4 items-center`}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={tw`h-2 bg-gray-300 rounded-full mx-1 ${activeBannerIndex === index ? 'bg-[#124CB8] w-4 shadow-sm' : 'w-2'
              }`}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeBannerSection;
