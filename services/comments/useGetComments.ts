import { getCommentApi } from "@/features/comments/getCommentApi";
import { useQuery } from "@tanstack/react-query";

const useGetComments = (videoId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => getCommentApi(videoId),
  });
  return {
    comments: data,
    commentsIsLoading: isLoading,
    commentsIsError: isError,
  };
};

export default useGetComments;
