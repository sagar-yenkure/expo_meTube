import { appWriteConfig, databases } from "@/lib/appWriteConfig";

export const removeLikesApi = async (videoId: string, $id: string) => {
  try {
    const videoDocument = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId
    );

    const videoLikeCollection = videoDocument?.likes || [];

    if (!videoLikeCollection.includes($id))
      throw new Error("you not liked the video");

    const updatedVideoLikeCollection = videoLikeCollection.filter(
      (id: string) => id !== $id
    );

    await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId,
      { likes: updatedVideoLikeCollection }
    );

    return { success: true, message: "Unlike the video" };
  } catch (error: any) {
    console.error("Error Unlike like:", error);
    return { success: false, error: error.message };
  }
};
