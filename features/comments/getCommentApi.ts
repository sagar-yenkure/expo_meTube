import { appWriteConfig, databases } from "@/lib/appWriteConfig";
import { Query } from "react-native-appwrite";
export type CommentType = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  avatar: string;
  comments: string;
  createdAt: string;
  userId: string;
  username: string;
  videoId: string;
};

export const getCommentApi = async (videoId: string) => {
  try {
    const commentsResponse = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.commentsCollectionId,
      [Query.equal("videoId", videoId)]
    );

    const comments = commentsResponse?.documents || [];

    const commentsWithUserInfo = await Promise.all(
      comments.map(async (comment) => {
        try {
          const userResponse = await databases.getDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            comment.userId
          );
          // Add user info to each comment
          return {
            ...comment,
            username: userResponse.username,
            avatar: userResponse.avatar,
          };
        } catch (userError) {
          console.error(
            `Error fetching user for comment ${comment.$id}:`,
            userError
          );
          return comment;
        }
      })
    );

    return commentsWithUserInfo as CommentType[];
  } catch (error: any) {
    console.error("Error fetching comments for videos:", error);
    throw new Error(error.message);
  }
};
