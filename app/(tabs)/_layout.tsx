import React from "react";
import { Tabs } from "expo-router";
import { View, Image, Text } from "react-native";

// custom Component for tabIcons
const TabIcons = ({
  icon,
  color,
  focused,
}: {
  icon: any;
  color: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center p-1">
      <Image
        resizeMode="contain"
        className="w-6 h-6"
        source={icon}
        style={{ tintColor: focused ? color : "gray" }}
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    // tab section in home
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 50,
          },
        }}
      >
        {/* home screen on tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: "HOME",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon={require("../../assets/icons/home.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        {/* bookmark screen on tab */}
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "BOOKMARK",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon={require("../../assets/icons/bookmark.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        {/* create screen on tab */}
        <Tabs.Screen
          name="create"
          options={{
            title: "CREATE",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon={require("../../assets/icons/plus.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        {/* profile screen on tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "PROFILE",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon={require("../../assets/icons/profile.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
