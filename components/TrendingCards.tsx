import React, { useState } from "react";
import {
  FlatList,
  Text,
  ViewToken,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";
import { videoTypes } from "@/hooks/useGetVideoFormatted";

// Create custom animations using `transform` for scale
const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setLoading(false);
    }
    if (status.didJustFinish) {
      setPlay(false);
      setVideoEnded(true);
    }
  };

  const handlePlayAgain = () => {
    setPlay(true);
    setVideoEnded(false);
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View className="relative w-52 h-72 rounded-[33px] mt-3 bg-white/10 overflow-hidden items-center justify-center">
          {loading && (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              className="absolute inset-0 justify-center items-center"
            />
          )}
          <Video
            source={{ uri: item?.$video }}
            className="w-full h-full rounded-[33px]"
            resizeMode={ResizeMode.COVER}
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            onLoadStart={() => setLoading(true)}
            onError={(error) => {
              // console.error("Video Error:", error);
              setLoading(false); // Stop loading on error
            }}
          />
          {videoEnded && (
            <TouchableOpacity
              onPress={handlePlayAgain}
              className="absolute bg-gray-800 p-2 rounded-lg bottom-2 left-1/2 transform -translate-x-1/2"
            >
              <Text className="text-white">Play Again</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: item?.$thumbnail }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          {/* Center play button */}

          {!loading && (
            <Image
              source={require("../assets/icons/play.png")}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          )}
          {/* Center loading spinner */}
          {loading && (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              className="absolute"
            />
          )}
          {/* Show play again button if video ended */}
          {videoEnded && (
            <TouchableOpacity
              onPress={handlePlayAgain}
              className="absolute bg-gray-200 h-14 w-14 justify-center items-center rounded-full"
            >
              <Image
                className="w-8 h-8"
                resizeMode="contain"
                source={require("../assets/icons/play-again.png")}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: videoTypes[] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id || "");

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.item?.$id);
    }
  };

  return (
    <>
      <Text className="text-white font-normal py-2 px-2 text-lg">
        Trending videos
      </Text>
      <FlatList
        data={posts}
        horizontal
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Trending;
