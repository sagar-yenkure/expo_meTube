import React from "react";
import { Text, FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetSearchPost from "@/services/post/useGetSearchPost";
import useGetVideoFormatted, { videoTypes } from "@/hooks/useGetVideoFormatted";
import VideoCart from "@/components/VideoCart";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";

const Search = () => {
  const { query } = useLocalSearchParams() as { query: string };
  const { data, isLoading, isError } = useGetSearchPost(query?.trim());

  const renderMessage = () => {
    if (isLoading)
      return (
        <EmptyState
          isSearch={true}
          title={"Searching for content"}
          subtitle={"Please wait"}
        />
      );
    if (isError)
      return (
        <EmptyState
          isSearch={true}
          title={"Error fetching content"}
          subtitle={"there was an error fetching content"}
        />
      );
    if (!data || data.length === 0)
      return (
        <EmptyState
          isSearch={true}
          title={"No videos found, you can create your own "}
          subtitle={"try with different keywords"}
        />
      );
    return null;
  };

  const message = renderMessage();

  return (
    <SafeAreaView className="h-full bg-black w-full">
      <View className="px-4 py-3">
        <Text className="text-sm text-white">Search result for</Text>
        <Text className="text-xl font-bold text-white ">{query?.trim()}</Text>
      </View>
      {/* Search input always stays at the top */}
      <View className="px-3 py-3">
        <SearchInput initialQuery={query?.trim()} />
      </View>

      {/* Display error/loading/empty message or the list of results */}
      <View className="flex-1 px-3">
        {message ? (
          <View className="mt-4">{message}</View>
        ) : (
          <FlatList
            data={useGetVideoFormatted(data)}
            keyExtractor={(item) => item?.$id}
            renderItem={({ item }: { item: videoTypes }) => (
              <VideoCart key={item?.$id} item={item} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
