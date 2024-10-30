import { updateComments } from "@/features/comments/updateComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ videoId, comment }: { videoId: string; comment: string }) =>
      updateComments({ videoId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => Alert.alert("server problem, please try again"),
  });

  return {
    updateComment: mutate,
    updateCommentPending: isPending,
    updateCommentError: isError,
  };
};

export default useUpdateComment;
