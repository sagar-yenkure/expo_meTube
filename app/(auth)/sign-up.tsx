import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import useSignUp from "@/services/auth/useSignUp";
import { Link, router } from "expo-router";

interface FormState {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { signUpTrigger, signUpLoading } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  // Retaining the eye icon paths as requested
  const eyeOpenIcon = require("../../assets/icons/eye.png");
  const eyeHiddenIcon = require("../../assets/icons/eye-hide.png");

  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
  });

  // Handle form input change
  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Handle sign-up process
  const handleSignUp = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    signUpTrigger(form, {
      onSuccess: () => router.push("/home"),
    });
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView className="h-full w-full">
        <View className="w-full flex justify-center h-full px-3 my-6">
          {/* Replace with your desired logo */}
          <View className="bg-yellow-500 p-4 rounded-full">
            <Text className="text-3xl text-black font-bold">MeTube</Text>
          </View>
          <Text className="text-2xl text-white mt-10 font-semibold">
            Sign Up
          </Text>

          {/* Username field */}
          <View className="space-y-2 mt-5">
            <Text className="text-base text-gray-100 font-medium">
              Username
            </Text>
            <TextInput
              className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-gray-900 text-white"
              placeholder="Enter your username"
              placeholderTextColor="#7B7B8B"
              value={form.username}
              onChangeText={(text) => handleInputChange("username", text)}
            />
          </View>

          {/* Email field */}
          <View className="space-y-2 mt-5">
            <Text className="text-base text-gray-100 font-medium">Email</Text>
            <TextInput
              className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-gray-900 text-white"
              placeholder="Enter your email"
              placeholderTextColor="#7B7B8B"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
          </View>

          {/* Password field */}
          <View className="space-y-2 mt-4">
            <Text className="text-base text-gray-100 font-medium">
              Password
            </Text>
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-gray-900 focus:border-gray-500 border-black-200 flex flex-row items-center">
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
              >
                <Image
                  source={showPassword ? eyeOpenIcon : eyeHiddenIcon}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={signUpLoading}
            className="bg-yellow-500 w-full mt-7 rounded-xl min-h-[50px] flex justify-center items-center"
          >
            <Text className="text-black font-bold">
              {signUpLoading ? "Signing Up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-normal ">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-yellow-400"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
