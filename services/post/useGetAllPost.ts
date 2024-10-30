import getAllPostApi from "@/features/postApi/getAllPostApi";
import { useQuery } from "@tanstack/react-query";

const useGetAllPost = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostApi(),
  });
  return {
    allPost: data,
    allPostIsLoading: isLoading,
    allPostIsError: isError,
    allPostRefetch: refetch,
  };
};

export default useGetAllPost;
