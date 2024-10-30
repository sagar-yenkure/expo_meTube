import { useGlobalContext } from "@/context/GlobalProvider";
import { addBookmarkApi } from "@/features/bookmarkApi/addBookmarkApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useAddBookmark = () => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const { $id } = user || {};

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (videoId: string) => addBookmarkApi(videoId, $id),
    onError: (err) => console.log(err?.message),
    onSuccess: (res) => {
      Alert.alert(res?.message || "Bookmark added successfully");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  return {
    addBookmark: mutate,
    addBookmarkPending: isPending,
    addBookmarkError: isError,
  };
};

export default useAddBookmark;
