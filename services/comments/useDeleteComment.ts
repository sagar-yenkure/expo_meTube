import { deleteComment } from "@/features/comments/deleteComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Alert } from "react-native";

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => Alert.alert("server problem, please try again"),
  });
  return {
    deleteComment: mutate,
    deleteCommentPending: isPending,
    deleteCommentError: isError,
  };
};

export default useDeleteComment;
