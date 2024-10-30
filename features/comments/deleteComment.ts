import { appWriteConfig, databases } from "@/lib/appWriteConfig";

export const deleteComment = async (commentId: string) => {
  try {
    await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.commentsCollectionId,
      commentId
    );
    return { success: true, message: "comment deleted of this video" };
  } catch (error: any) {
    console.error("Error deleting comments for videos:", error);
    return { success: false, error: error.message };
  }
};
