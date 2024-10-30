import { appWriteConfig, databases } from "@/lib/appWriteConfig";
import { ID } from "react-native-appwrite";

export const addComments = async (
  userId: string,
  videoId: string,
  comments: string
) => {
  try {
    if (!userId || !videoId || !comments) throw new Error("Invalid input");
    await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.commentsCollectionId,
      ID.unique(),
      {
        userId,
        videoId,
        comments,
        createdAt: new Date().toISOString(),
      }
    );
    return { success: true, message: "comment added to video" };
  } catch (error: any) {
    console.error("Error fetching comments for videos:", error);
    return { success: false, error: error.message };
  }
};
