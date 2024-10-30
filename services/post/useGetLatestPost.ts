import getLatestPostApi from "@/features/postApi/getLatestPostApi";
import { useQuery } from "@tanstack/react-query";

const useGetLatestPost = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: () => getLatestPostApi(),
  });
  return {
    latestPost: data,
    latestPostIsLoading: isLoading,
    latestPostIsError: isError,
    latestPostRefetch: refetch,
  };
};

export default useGetLatestPost;
