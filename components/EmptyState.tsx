import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

const EmptyState = ({
  title,
  subtitle,
  isSearch,
}: {
  title: String;
  subtitle: String;
  isSearch?: boolean;
}) => {
  return (
    <View className="flex bg-black  justify-center items-center px-4">
      <Image
        source={require("../assets/images/empty.png")}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm text-center  font-medium text-gray-100">
        {title}
      </Text>
      <Text className="text-xl text-center font-semibold text-white mt-2">
        {subtitle}
      </Text>

      {!isSearch && (
        <TouchableOpacity
          onPress={() => router.push("/create")}
          activeOpacity={0.8}
          className="bg-yellow-500 w-full mt-7 rounded-xl min-h-[50px] flex justify-center items-center"
        >
          <Text className="text-black font-bold">create videos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
