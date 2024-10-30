import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

const SearchInput = ({
  initialQuery,
}: {
  initialQuery: string | undefined;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string | undefined>(initialQuery);

  return (
    <View className="w-full h-14 transition-all ease-in 2s px-3 bg-black-100 rounded-2xl bg-gray-900 border-gray-900 border-2  border-black-200 flex flex-row items-center">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-regular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={require("../assets/icons/search.png")}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
