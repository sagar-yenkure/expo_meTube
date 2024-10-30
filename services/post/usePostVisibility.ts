import { postVisibilityApi } from "@/features/postApi/postVisibilityApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const usePostVisibility = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({
      videoId,
      visibility,
    }: {
      videoId: string;
      visibility: boolean;
    }) => postVisibilityApi(videoId, visibility),
    onError: (err) => Alert.alert(err?.message),
    onSuccess: (res) => {
      Alert.alert(res?.message || "Post visibility updated");
      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
  });
  return {
    postVisibility: mutate,
    postVisibilityPending: isPending,
    postVisibilityError: isError,
  };
};

export default usePostVisibility;
