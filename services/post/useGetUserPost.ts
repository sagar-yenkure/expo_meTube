import { getUserPostApi } from "@/features/postApi/getUserPostApi";
import { useQuery } from "@tanstack/react-query";

const useGetUserPost = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserPostApi(userId),
    queryKey: ["userPosts"],
  });

  return {
    userPost: data,
    userPostIsLoading: isLoading,
    userPostIsError: isError,
  };
};

export default useGetUserPost;
