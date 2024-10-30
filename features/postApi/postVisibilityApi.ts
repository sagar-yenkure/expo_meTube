import { appWriteConfig, databases } from "@/lib/appWriteConfig";

export const postVisibilityApi = async (
  videoId: string,
  visibility: boolean
) => {
  try {
    if (!videoId && !visibility)
      throw new Error("Invalid videoId or visibility option");

    await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId,
      { isPrivate: !visibility }
    );
    return { success: true, message: "Post visibility updated" };
  } catch (error: any) {
    console.error("Error changing post visibility:", error);
    return { success: false, error: error.message };
  }
};
