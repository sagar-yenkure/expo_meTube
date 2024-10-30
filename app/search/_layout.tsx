import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const searchLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[query]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default searchLayout;
