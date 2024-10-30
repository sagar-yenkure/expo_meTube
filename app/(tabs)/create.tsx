import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ResizeMode, Video } from "expo-av";
import useAddPost from "@/services/post/useAddPost";

export interface FormData {
  title: string;
  creator: string;
  prompt: string;
  thumbnail: string | "";
  video: string | "";
  isPrivate: boolean;
}

const CreateVideo: React.FC = () => {
  const { addPost, addPostPending } = useAddPost();
  const { user } = useGlobalContext();
  const { $id } = user;

  const [formData, setFormData] = useState<any>({
    creator: $id || "",
    title: "",
    prompt: "",
    thumbnail: "",
    video: "",
    isPrivate: false,
  });

  // Handle thumbnail selection
  const handleChooseThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result?.canceled) {
      setFormData((prevData: any) => ({
        ...prevData,
        thumbnail: result.assets[0],
      }));
    }
  };

  // Handle video selection
  const handleChooseVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
      copyToCacheDirectory: true,
    });

    if (!result?.canceled) {
      setFormData((prevData: any) => ({
        ...prevData,
        video: result.assets[0],
      }));
    }
  };

  // Toggle isPrivate value
  const toggleIsPrivate = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      isPrivate: !prevData.isPrivate,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("image:", formData.thumbnail);
    console.log("video:", formData.video);
    addPost(formData);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-900">
      <ScrollView>
        {/* Upload Section */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-white text-center">
            Upload
          </Text>
        </View>

        {/* Title Input */}
        <View className="mb-4">
          <Text className="text-lg text-white">Title</Text>
          <TextInput
            className="border border-gray-600 p-3 mt-2 rounded bg-gray-800 text-white"
            placeholder="Enter video title"
            value={formData.title}
            onChangeText={(text) =>
              setFormData((prevData: any) => ({ ...prevData, title: text }))
            }
          />
        </View>

        {/* Prompt Input */}
        <View className="mb-4">
          <Text className="text-lg text-white">Prompt</Text>
          <TextInput
            className="border border-gray-600 p-3 mt-2 rounded bg-gray-800 text-white"
            placeholder="Enter video prompt"
            value={formData.prompt}
            onChangeText={(text) =>
              setFormData((prevData: any) => ({ ...prevData, prompt: text }))
            }
          />
        </View>

        {/* Thumbnail Picker */}
        <View className="mb-4">
          <Text className="text-lg text-white">Thumbnail</Text>
          <TouchableOpacity
            className="bg-blue-500 p-3 mt-2 rounded"
            onPress={handleChooseThumbnail}
          >
            <Text className="text-center text-lg text-white">
              {formData.thumbnail ? "Change Thumbnail" : "Choose Thumbnail"}
            </Text>
          </TouchableOpacity>

          {formData.thumbnail && (
            <Image
              source={{ uri: formData.thumbnail.uri }}
              style={{
                width: "100%",
                height: 160,
                marginTop: 8,
                borderRadius: 8,
              }}
              resizeMode={ResizeMode.COVER}
            />
          )}
        </View>

        {/* Video Picker */}
        <View className="mb-4">
          <Text className="text-lg text-white">Video</Text>
          <TouchableOpacity
            className="bg-blue-500 p-3 mt-2 rounded"
            onPress={handleChooseVideo}
          >
            <Text className="text-center text-lg text-white">
              {formData.video ? "Change Video" : "Choose Video"}
            </Text>
          </TouchableOpacity>
        </View>

        {formData.video && (
          <Video
            source={{ uri: formData.video.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        {/* Private Toggle */}
        <View className="mb-4 flex-row justify-between items-center">
          <Text className="text-lg text-white">Private</Text>
          <Switch
            value={formData.isPrivate}
            onValueChange={toggleIsPrivate}
            thumbColor={formData.isPrivate ? "#f5dd4b" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        {/* Upload Button */}
        <View className="mt-6">
          <Button
            disabled={addPostPending}
            title={addPostPending ? "Adding..." : "Upload Files"}
            onPress={handleSubmit}
            color="#6200ee"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateVideo;
