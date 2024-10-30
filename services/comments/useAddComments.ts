import { useGlobalContext } from "@/context/GlobalProvider";
import { addComments } from "@/features/comments/addComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useAddComments = () => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const { $id } = user || {};
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({
      videoId,
      comments,
    }: {
      videoId: string;
      comments: string;
    }) => addComments($id, videoId, comments),
    onSuccess: () => {
      Alert.alert("comment added successfully");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => Alert.alert("server problem, please try again"),
  });
  return {
    addComments: mutate,
    addCommentsPending: isPending,
    addCommentsError: isError,
  };
};

export default useAddComments;
