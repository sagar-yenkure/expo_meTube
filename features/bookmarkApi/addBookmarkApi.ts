import { appWriteConfig, databases } from "@/lib/appWriteConfig";

export const addBookmarkApi = async (videoId: string, $id: string) => {
  try {
    if (!videoId)
      return {
        success: false,
        message: "Cannot bookmark, video does not exist",
      };

    if (!$id) return { success: false, message: "User not logged in" };

    // Fetch the user's document by their ID
    const userDocument = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      $id
    );

    const bookmarks = userDocument.bookmarks || [];

    // Check if the video is already bookmarked
    if (bookmarks.includes(videoId)) {
      return { success: false, message: "Bookmark already exists" };
    }

    // Add the new videoId to the bookmarks array
    bookmarks.push(videoId);

    // Update the user's document with the new bookmarks array
    await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      $id,
      { bookmarks }
    );

    return { success: true, message: "Bookmark added successfully!" };
  } catch (error: any) {
    console.error("Error adding bookmark:", error);
    return { success: false, error: error.message };
  }
};
