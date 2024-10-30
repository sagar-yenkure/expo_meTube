import { deletePostApi } from "@/features/postApi/deletePostApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (videoId: string) => deletePostApi(videoId),
    onError: (err) => Alert.alert(err?.message),
    onSuccess: (res) => {
      Alert.alert(res?.message || "post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["userPosts", "posts", "latestPosts", "bookmarks"],
      });
    },
  });
  return {
    deletePost: mutate,
    deletePostPending: isPending,
    deletePostError: isError,
  };
};

export default useDeletePost;
