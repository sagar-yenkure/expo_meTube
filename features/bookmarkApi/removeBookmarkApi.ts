import { appWriteConfig, databases } from "@/lib/appWriteConfig";

export const removeBookmarkApi = async (videoId: string, $id: string) => {
  try {
    if (!videoId)
      return {
        success: false,
        message: "Cannot remove bookmark, video does not exist",
      };

    if (!$id) return { success: false, message: "User not logged in" };

    const userDocument = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      $id
    );

    const bookmarks = userDocument?.bookmarks || [];

    if (!bookmarks.includes(videoId)) {
      return { success: false, message: "Bookmark does not exist" };
    }

    const updatedBookmarks = bookmarks.filter((id: string) => id !== videoId);

    await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      $id,
      { bookmarks: updatedBookmarks }
    );

    return { success: true, message: "Bookmark removed successfully!" };
  } catch (error: any) {
    console.error("Error removing bookmark:", error);
    return { success: false, error: error.message };
  }
};
