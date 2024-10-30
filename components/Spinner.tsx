import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = () => {
  return (
    <View className="flex-1 items-center justify-center px-3">
      <ActivityIndicator
        size="small"
        color="#4A4A4A"
        style={{ position: "absolute" }}
      />
    </View>
  );
};

export default Spinner;
