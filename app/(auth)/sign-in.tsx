import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import useSignIn from "@/services/auth/useSignIn";

interface FormState {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signInTrigger, signInLoading } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormState>({ email: "", password: "" });

  // Eye icon paths
  const eyeOpenIcon = require("../../assets/icons/eye.png");
  const eyeHiddenIcon = require("../../assets/icons/eye-hide.png");

  // Handle sign in
  const handleSignIn = () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    signInTrigger(form, {
      onSuccess: () => router.push("/home"),
    });
  };

  // Handle form input change
  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView className="h-full w-full">
        <View className="w-full flex justify-center h-full px-3 my-6">
          {/* Text-Based Logo */}
          <View className="bg-yellow-500 p-4 rounded-full">
            <Text className="text-3xl text-black font-bold">MeTube</Text>
          </View>

          <Text className="text-2xl text-white mt-10 font-semibold">
            Sign in
          </Text>

          {/* Email field */}
          <View className="space-y-2 mt-5">
            <Text className="text-base text-gray-100 font-medium">Email</Text>
            <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl border-gray-900 border-2 flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-semibold text-base"
                value={form.email}
                placeholder="Enter your email"
                placeholderTextColor="#7B7B8B"
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password field */}
          <View className="space-y-2 mt-4">
            <Text className="text-base text-gray-100 font-medium">
              Password
            </Text>
            <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl border-2 border-gray-900 flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-semibold text-base"
                secureTextEntry={!showPassword}
                value={form.password}
                placeholder="Enter your password"
                placeholderTextColor="#7B7B8B"
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                className="ml-2"
              >
                <Image
                  source={showPassword ? eyeOpenIcon : eyeHiddenIcon}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={signInLoading}
            activeOpacity={0.8}
            className="bg-yellow-500 w-full mt-7 rounded-xl min-h-[50px] flex justify-center items-center"
          >
            <Text className="text-black font-bold">
              {signInLoading ? "Loading..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Sign-up link */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-normal ">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-yellow-400"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
