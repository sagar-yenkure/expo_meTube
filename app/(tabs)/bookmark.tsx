import { FlatList, SafeAreaView, Text, View } from "react-native";

import EmptyState from "@/components/EmptyState";
import BookmarkVideoComponents from "@/components/modalComponents/BookmarkVideoComponents";
import VideoCart from "@/components/VideoCart";
import useGetVideoFormatted from "@/hooks/useGetVideoFormatted";
import { useVideoStore } from "@/hooks/useStore";
import useGetBookmarks from "@/services/bookmarks/useGetBookmarks";

const Bookmark = () => {
  const { selectedVideo } = useVideoStore();
  const { bookmarks, bookmarksLoading, bookmarkError } = useGetBookmarks();

  // Get formatted videos using the bookmarks array
  const formattedVideos = useGetVideoFormatted(bookmarks);

  if (bookmarksLoading) {
    return (
      <EmptyState
        title="getting your uploads..."
        subtitle="it will take a few seconds"
      />
    );
  }

  if (bookmarkError) {
    return (
      <EmptyState title="something went wrong" subtitle="please try again" />
    );
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={formattedVideos}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <VideoCart
            modalComponent={<BookmarkVideoComponents item={selectedVideo} />}
            item={item}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        }
        ListHeaderComponent={
          <View className="mt-12 mb-3 w-full p-4">
            <Text className="text-white text-xl">My Bookmarks</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
