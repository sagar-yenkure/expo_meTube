import { useGlobalContext } from "@/context/GlobalProvider";
import getBookmarkPostApi from "@/features/bookmarkApi/getBookmarkPostApi";
import { useQuery } from "@tanstack/react-query";

const useGetBookmarks = () => {
  const { user } = useGlobalContext();
  const { $id } = user || {};

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarkPostApi($id),
  });

  return {
    bookmarks: data,
    bookmarksLoading: isLoading,
    bookmarkError: isError,
  };
};

export default useGetBookmarks;
