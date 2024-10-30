import { appWriteConfig, databases } from "@/lib/appWriteConfig";

export const updateComments = async ({
  videoId,
  comment,
}: {
  videoId: string;
  comment: string;
}) => {
  try {
    if (!videoId || !comment) throw new Error("Invalid input");

    await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.commentsCollectionId,
      videoId,
      { comments: comment }
    );
  } catch (error: any) {
    console.error("Error updating comments for videos:", error);
    return { success: false, error: error.message };
  }
};
