import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { videoTypes } from "@/hooks/useGetVideoFormatted";
import useAddLike from "@/services/likes/useAddLike";
import useRemoveLike from "@/services/likes/useRemoveLike";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommentDivider from "./CommentDivider";
import useGetComments from "@/services/comments/useGetComments";

const VideoBar = ({ video }: { video: videoTypes }) => {
  const { addLike, addLikePending } = useAddLike();
  const { comments, commentsIsLoading } = useGetComments(video?.$id);
  const { removeLike, removeLikePending } = useRemoveLike();
  const { user } = useGlobalContext();
  const userId = user?.$id;

  const userAlreadyLikedVideo = video?.$likes?.includes(userId);
  const [liked, setLiked] = useState(userAlreadyLikedVideo);
  const [likesCount, setLikesCount] = useState(video?.$likes?.length || 0);
  const [showComments, setShowComments] = useState(false);

  const handleToggleLike = async () => {
    const videoId = video?.$id;
    if (liked) {
      setLiked(false);
      setLikesCount((count) => Math.max(0, count - 1));
      await removeLike(videoId);
    } else {
      setLiked(true);
      setLikesCount((count) => count + 1);
      await addLike(videoId);
    }
  };

  const handleDrawerToggle = () => {
    setShowComments(!showComments);
  };

  const isPending = addLikePending || removeLikePending;

  return (
    <View className="w-full">
      <View className="flex-row gap-1 items-center">
        {/* Like button and count section */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            disabled={isPending}
            activeOpacity={0.7}
            onPress={handleToggleLike}
            style={{ opacity: isPending ? 0.5 : 1 }}
          >
            <Icon
              name="favorite"
              size={30}
              color={liked ? "red" : "white"}
              style={{ transform: [{ scale: liked ? 1.2 : 1 }] }}
            />
          </TouchableOpacity>
          <Text className="text-white text-sm w-fit">{likesCount}</Text>
        </View>

        {/* Comments button and count section */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity activeOpacity={0.7} onPress={handleDrawerToggle}>
            <Icon name="chat" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-sm w-full">{comments?.length}</Text>
        </View>
      </View>

      {/* Scrollable comments section */}
      {showComments && (
        <CommentDivider
          videoId={video?.$id || ""}
          comments={comments}
          commentsIsLoading={commentsIsLoading}
        />
      )}
    </View>
  );
};

export default VideoBar;
