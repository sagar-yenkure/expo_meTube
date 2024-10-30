import addPostApi from "@/features/postApi/addPostApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useAddPost = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (form) => addPostApi(form),
    onSuccess: () => {
      Alert.alert("post added successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
    onError: (err) =>
      Alert.alert(err.message || "there is error while adding the post"),
  });
  return { addPost: mutate, addPostPending: isPending, addPostError: isError };
};

export default useAddPost;
