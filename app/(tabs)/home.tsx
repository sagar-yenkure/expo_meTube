import React, { useCallback, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import useGetAllPost from "@/services/post/useGetAllPost";
import VideoCart from "@/components/VideoCart";
import useGetLatestPost from "@/services/post/useGetLatestPost";
import useGetVideoFormatted, { videoTypes } from "@/hooks/useGetVideoFormatted";
import Trending from "@/components/TrendingCards";
import SearchInput from "@/components/SearchInput";
import HomeVideoComponents from "@/components/modalComponents/HomeVideoComponents";
import { useVideoStore } from "@/hooks/useStore";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const { selectedVideo } = useVideoStore();
  const [refreshing, setRefreshing] = useState(false);
  const { allPost, allPostIsLoading, allPostRefetch } = useGetAllPost();
  const { latestPost, latestPostIsLoading, latestPostRefetch } =
    useGetLatestPost();
  const { user } = useGlobalContext();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([allPostRefetch(), latestPostRefetch()]).finally(() => {
      setRefreshing(false);
    });
  }, [allPostRefetch, latestPostRefetch]);

  if (allPostIsLoading || latestPostIsLoading) {
    return (
      <EmptyState
        isSearch
        title="Searching for content"
        subtitle="Please wait"
      />
    );
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={useGetVideoFormatted(allPost)}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <VideoCart
            item={item}
            modalComponent={<HomeVideoComponents item={selectedVideo} />}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View className="my-3 px-3">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-sm text-white">Welcome Home</Text>
                <Text className="text-2xl font-bold text-white">
                  {user?.username || "User"}
                </Text>
              </View>
              <View className="mt-1">
                <View className="bg-yellow-500 p-2 rounded-full">
                  <Text className="text-3xl text-black font-bold">MeTube</Text>
                </View>
              </View>
            </View>
            <SearchInput initialQuery="" />
            <Trending posts={useGetVideoFormatted(latestPost)} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Create your first video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
