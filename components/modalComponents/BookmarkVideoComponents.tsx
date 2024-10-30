import React from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { videoTypes } from "@/hooks/useGetVideoFormatted";
import Icon from "react-native-vector-icons/MaterialIcons";
import useRemoveBookmark from "@/services/bookmarks/useRemoveBookmark";

const BookmarkVideoComponents = ({ item }: { item: videoTypes }) => {
  const { removeBookmark, removeBookmarkPending } = useRemoveBookmark();

  const handleRemoveBookmark = async () => {
    removeBookmark(item.$id);
  };

  const handleDownload = () => {
    console.log("Download:", item?.$title);
  };

  const handleSubmitReport = () => {
    Alert.alert(
      "Report",
      "Reported successfully, we will look into it and get back to you shortly."
    );
  };

  return (
    <View className="justify-center items-center">
      <View className="m-3 bg-black rounded-2xl p-4 w-full">
        <Text className="mb-4 text-center font-bold text-xl">Actions</Text>

        <Pressable
          className="bg-gray-800 flex-row items-center justify-center rounded-lg p-2 mb-2"
          onPress={handleRemoveBookmark}
          disabled={removeBookmarkPending}
        >
          {removeBookmarkPending ? (
            <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
          ) : (
            <>
              <Icon
                name="bookmark-remove"
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="text-white font-bold">Remove from Bookmark</Text>
            </>
          )}
        </Pressable>

        <Pressable
          className="bg-red-600 flex-row items-center justify-center rounded-lg p-2 mb-2"
          onPress={handleSubmitReport}
        >
          <Icon name="report" size={24} color="white" className="mr-2" />
          <Text className="text-white font-bold">Report this Video</Text>
        </Pressable>

        <Pressable
          className="bg-green-600 flex-row items-center justify-center rounded-lg p-2 mb-2"
          onPress={handleDownload}
        >
          <Icon name="file-download" size={24} color="white" className="mr-2" />
          <Text className="text-white font-bold">Download</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BookmarkVideoComponents;
