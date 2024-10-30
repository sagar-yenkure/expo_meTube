import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import ModalForm from "@/components/ModalForm";
import { videoTypes } from "@/hooks/useGetVideoFormatted";
import { useVideoStore } from "@/hooks/useStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import VideoBar from "./VideoBar";

interface VideoCartProps {
  item: videoTypes;
  modalComponent?: JSX.Element;
}

const VideoCart: React.FC<VideoCartProps> = ({ item, modalComponent }) => {
  const { $title, $thumbnail, creator, $video } = item;
  const { $avatar, $name } = creator;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { setSelectedVideo } = useVideoStore();
  const handlePlaybackStatusUpdate = (status: any) => {
    if (status?.isLoaded) setIsLoading(false);
    if (status?.didJustFinish) {
      setIsPlaying(false);
      setVideoEnded(true);
    }
  };

  const handlePlayAgain = () => {
    setIsPlaying(true);
    setVideoEnded(false);
  };

  const handleOpenModal = () => {
    setSelectedVideo(item);
    setModalVisible(true);
  };

  return (
    <View className="flex flex-col items-center px-4 mb-6">
      <View className="flex flex-row gap-3 justify-center items-center">
        <View className="flex justify-center items-center flex-row flex-1">
          {/* video owner logo */}
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: $avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          {/* video title ans video owner name */}
          <View className="flex justify-center flex-1 ml-3">
            <Text
              className="font-semibold text-sm text-white"
              numberOfLines={1}
            >
              {$title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-regular"
              numberOfLines={1}
            >
              {$name}
            </Text>
          </View>
          {/* video visibility status */}
          <View>
            <Icon
              name={item?.$isPrivate ? "lock" : "public"}
              size={30}
              color="white"
            />
          </View>
        </View>
        {/* video menu */}
        <View className="pt-2">
          <TouchableOpacity onPress={handleOpenModal}>
            <Image
              source={require("../assets/icons/menu.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full h-60 bg-gray-900 rounded-xl mt-3 relative flex justify-center items-center">
        {isPlaying ? (
          <Video
            source={{ uri: $video }}
            className="w-full h-full rounded-xl"
            resizeMode={ResizeMode.COVER}
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            onLoadStart={() => setIsLoading(true)}
          />
        ) : (
          <Image
            source={{ uri: $thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        )}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#FFF"
            className="absolute z-10 w-12 h-12"
          />
        )}
        {!isPlaying && !isLoading && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsPlaying(true)}
            className="absolute h-12 w-12 justify-center items-center rounded-full"
          >
            <Image
              source={require("../assets/icons/play.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {videoEnded && (
          <TouchableOpacity
            onPress={handlePlayAgain}
            className="absolute bg-gray-200 h-14 w-14 justify-center items-center rounded-full"
          >
            <Image
              source={require("../assets/icons/play-again.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* video down bar */}
      <VideoBar video={item} />

      {/* modal for video actions menu */}
      <ModalForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalComponent={modalComponent}
      />
    </View>
  );
};

export default VideoCart;
