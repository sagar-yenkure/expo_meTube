import searchPostApi from "@/features/postApi/searchPostApi";
import { useQuery } from "@tanstack/react-query";

const useGetSearchPost = (query: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchPost", query],
    queryFn: () => searchPostApi(query),
  });

  return { data, isLoading, isError, error };
};

export default useGetSearchPost;
