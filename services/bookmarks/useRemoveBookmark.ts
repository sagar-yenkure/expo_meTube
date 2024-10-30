import { Alert } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { removeBookmarkApi } from "@/features/bookmarkApi/removeBookmarkApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const { $id } = user || {};

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (videoId: string) => removeBookmarkApi(videoId, $id),
    onError: (err) => Alert.alert(err?.message),
    onSuccess: (res) => {
      Alert.alert(res?.message || "Bookmark removed successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
  return {
    removeBookmark: mutate,
    removeBookmarkPending: isPending,
    removeBookmarkError: isError,
  };
};

export default useRemoveBookmark;
