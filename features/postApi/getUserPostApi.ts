import { appWriteConfig, databases } from "@/lib/appWriteConfig";
import { Query } from "react-native-appwrite";

export const getUserPostApi = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.equal("creator", String(userId))]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
