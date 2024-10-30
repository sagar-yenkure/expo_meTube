import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";
import ProfileVideoComponents from "@/components/modalComponents/ProfileVideoComponents";
import VideoCart from "@/components/VideoCart";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOutApi } from "@/features/authApi/signOutApi";
import useGetVideoFormatted from "@/hooks/useGetVideoFormatted";
import { useVideoStore } from "@/hooks/useStore";
import useGetUserPost from "@/services/post/useGetUserPost";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

const profile = () => {
  const { selectedVideo } = useVideoStore();
  const { setUser, setIsLogged, user } = useGlobalContext();
  const { $id, avatar, username } = user || {};
  const { userPost } = useGetUserPost($id);

  const logout = async () => {
    await signOutApi();
    setUser(null);
    setIsLogged(false);
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      {userPost && (
        <FlatList
          data={useGetVideoFormatted(userPost)}
          keyExtractor={(item) => item?.$id}
          renderItem={({ item }) => (
            <VideoCart
              modalComponent={<ProfileVideoComponents item={selectedVideo} />}
              item={item}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this profile"
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full flex justify-center items-center mt-12 mb-12 px-4">
              <TouchableOpacity
                onPress={logout}
                className="flex w-full items-end mb-10"
              >
                <Image
                  source={require("../../assets/icons/logout.png")}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
                <Image
                  source={{ uri: avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>

              <InfoBox
                title={username}
                containerStyles="mt-5 w-full"
                titleStyles="text-lg"
              />

              <View className="flex flex-row border border-gray-600 p-5 rounded-md">
                <InfoBox
                  title={userPost?.length || 0}
                  subtitle="Posts"
                  titleStyles="text-xl "
                  containerStyles="mr-10"
                />
                <InfoBox
                  title="1.2k"
                  subtitle="Followers"
                  titleStyles="text-xl w-full"
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default profile;
