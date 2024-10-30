import { appWriteConfig, databases, storage } from "@/lib/appWriteConfig";

export const deletePostApi = async (videoId: string) => {
  try {
    const videoDocument = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId
    );

    if (!videoDocument) throw new Error("Post not found or already deleted");

    const thumbnailUrl = videoDocument?.thumbnail;
    const videoUrl = videoDocument?.video;

    const thumbnailFileId = thumbnailUrl?.split("/files/")[1].split("/")[0];
    const videoFileId = videoUrl?.split("/files/")[1].split("/")[0];

    await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId
    );

    await storage.deleteFile(appWriteConfig.bucketId, thumbnailFileId);
    await storage.deleteFile(appWriteConfig.bucketId, videoFileId);

    return {
      success: true,
      message: "Post and storage files deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting post or files:", error);
    return { success: false, error: error.message };
  }
};
