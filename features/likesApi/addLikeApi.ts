import { appWriteConfig, databases } from "@/lib/appWriteConfig";

const addLikeApi = async (videoId: string, $id: string) => {
  try {
    const videoDocument = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId
    );

    const videoLikeCollection = videoDocument?.likes || [];

    if (videoLikeCollection.includes($id))
      throw new Error("already liked the video");

    videoLikeCollection.push($id);

    await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      videoId,
      { likes: videoLikeCollection }
    );
    return { success: true, message: "liked the video" };
  } catch (error: any) {
    console.error("Error adding like:", error);
    return { success: false, error: error.message };
  }
};

export default addLikeApi;
