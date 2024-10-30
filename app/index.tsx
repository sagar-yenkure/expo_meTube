import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) {
    console.log("Redirecting to /home");
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View className="flex-1 justify-center items-center px-4">
          {/* Text-Based Logo */}
          <View className="bg-yellow-500 p-4 rounded-full">
            <Text className="text-3xl text-black font-bold">MeTube</Text>
          </View>

          <View className="bg-gray-900 w-full h-1/2 justify-center items-center mt-5 p-4 rounded-lg">
            <Text className="text-3xl text-white font-bold text-center">
              Explore Your Favorite{"\n"}
              Content with <Text className="text-yellow-500">MeTube</Text>
            </Text>

            <Text className="text-sm text-gray-100 mt-5 text-center">
              Your Ultimate Destination for Video Streaming and Sharing
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            activeOpacity={0.8}
            className="bg-yellow-500 w-full mt-7 rounded-xl min-h-[50px] flex justify-center items-center"
          >
            <Text className="text-black font-bold">Continue with Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
