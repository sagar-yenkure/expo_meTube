import { appWriteConfig, databases } from "@/lib/appWriteConfig";
import { Query } from "react-native-appwrite";

const getAllPostApi = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.equal("isPrivate", false)]
    );
    return posts?.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getAllPostApi;
