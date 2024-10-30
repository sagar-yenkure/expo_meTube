import { appWriteConfig, databases } from "@/lib/appWriteConfig";
import { Query } from "react-native-appwrite";

export const getBookmarkPostApi = async ($id: string) => {
  try {
    const userDocument = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      $id
    );

    const bookmarks: string[] = userDocument?.bookmarks || [];

    if (!bookmarks.length) return [];

    const bookmarkedVideos = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.equal("$id", bookmarks)]
    );
    ``;
    return bookmarkedVideos?.documents;
  } catch (error: any) {
    console.error("Error fetching bookmarked videos:", error);
    throw new Error(error);
  }
};

export default getBookmarkPostApi;
