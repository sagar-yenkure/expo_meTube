import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { videoTypes } from "@/hooks/useGetVideoFormatted";
import Icon from "react-native-vector-icons/MaterialIcons";
import useAddBookmark from "@/services/bookmarks/useAddBookmark";
import useGetBookmarks from "@/services/bookmarks/useGetBookmarks";
import useRemoveBookmark from "@/services/bookmarks/useRemoveBookmark";

const HomeVideoComponents = ({ item }: { item: videoTypes }) => {
  const { bookmarks } = useGetBookmarks();
  const { addBookmark, addBookmarkPending } = useAddBookmark();
  const { removeBookmark, removeBookmarkPending } = useRemoveBookmark();

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const isAlreadyBookmarked = bookmarks?.some(
      (bookmark) => bookmark?.$id === item?.$id
    );
    setIsBookmarked(!!isAlreadyBookmarked);
  }, [bookmarks, item?.$id]);

  const handleBookmarkToggle = async () => {
    if (!item?.$id) return;
    if (isBookmarked) {
      removeBookmark(item.$id);
      return;
    } else {
      addBookmark(item.$id);
      return;
    }
  };

  const handleDownload = () => {
    console.log("Download:", item?.$title);
  };

  return (
    <View className="justify-center items-center">
      <View className="m-3 bg-black rounded-2xl p-4 w-full">
        <Text className="mb-4 text-center font-bold text-xl">Actions</Text>

        <Pressable
          className="bg-gray-800 flex-row items-center justify-center rounded-lg p-2 mb-2"
          onPress={handleBookmarkToggle}
          disabled={addBookmarkPending || removeBookmarkPending}
        >
          {addBookmarkPending || removeBookmarkPending ? (
            <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
          ) : (
            <>
              <Icon
                name={isBookmarked ? "bookmark-remove" : "bookmark"}
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="text-white font-bold">
                {isBookmarked ? "Remove from Bookmark" : "Add to Bookmark"}
              </Text>
            </>
          )}
        </Pressable>

        <Pressable
          className="bg-red-600 flex-row items-center justify-center rounded-lg p-2 mb-2"
          onPress={() =>
            Alert.alert(
              "Report",
              "Reported successfully, we will look into it and get back to you shortly."
            )
          }
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

export default HomeVideoComponents;
