import { appWriteConfig, databases } from "@/lib/appWriteConfig";
import { Query } from "react-native-appwrite";

const getLatestPostApi = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [
        Query.equal("isPrivate", false),
        Query.orderDesc("$createdAt"),
        Query.limit(6),
      ]
    );
    return posts?.documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getLatestPostApi;
