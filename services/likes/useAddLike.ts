import { useGlobalContext } from "@/context/GlobalProvider";
import addLikeApi from "@/features/likesApi/addLikeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useAddLike = () => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const { $id } = user || {};

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (videoId: string) => addLikeApi(videoId, $id),
    onError: () => Alert.alert("server problem, please try again"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return {
    addLike: mutate,
    addLikePending: isPending,
    addLikeError: isError,
  };
};

export default useAddLike;
