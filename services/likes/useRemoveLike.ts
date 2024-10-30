import { useGlobalContext } from "@/context/GlobalProvider";
import { removeLikesApi } from "@/features/likesApi/removeLikesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useRemoveLike = () => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const { $id } = user || {};

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (videoId: string) => removeLikesApi(videoId, $id),
    onError: () => Alert.alert("server problem, please try again"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return {
    removeLike: mutate,
    removeLikePending: isPending,
    removeLikeError: isError,
  };
};

export default useRemoveLike;
