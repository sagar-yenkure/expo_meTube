import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { videoTypes } from "@/hooks/useGetVideoFormatted";
import Icon from "react-native-vector-icons/MaterialIcons";
import useDeletePost from "@/services/post/useDeletePost";
import usePostVisibility from "@/services/post/usePostVisibility";

const ProfileVideoComponents = ({ item }: { item: videoTypes }) => {
  const { deletePost, deletePostPending } = useDeletePost();
  const { postVisibility, postVisibilityPending } = usePostVisibility();

  const handleRemoveBookmark = () => {
    deletePost(item?.$id);
  };

  const handleChangeVideoVisibility = () => {
    postVisibility({ videoId: item?.$id, visibility: item?.$isPrivate });
  };

  return (
    <>
      <View className="justify-center items-center">
        <View className="m-3 bg-black rounded-2xl p-4 w-full">
          <Text className="mb-4 text-center font-bold text-xl">Actions</Text>

          <Pressable
            className="bg-gray-800 flex-row items-center justify-center rounded-lg p-2 mb-2"
            onPress={handleRemoveBookmark}
            disabled={deletePostPending}
          >
            {deletePostPending ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
                className="mr-2"
              />
            ) : (
              <>
                <Icon name="delete" size={24} color="white" className="mr-2" />
                <Text className="text-white font-bold">delete post</Text>
              </>
            )}
          </Pressable>

          <Pressable
            className="bg-gray-800 flex-row items-center justify-center rounded-lg p-2 mb-2"
            onPress={handleChangeVideoVisibility}
            disabled={postVisibilityPending}
          >
            {postVisibilityPending ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
                className="mr-2"
              />
            ) : (
              <>
                <Icon
                  name={item?.$isPrivate ? "public" : "lock"}
                  size={26}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-white font-bold">
                  {item.$isPrivate ? "make public" : "make private"}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ProfileVideoComponents;
