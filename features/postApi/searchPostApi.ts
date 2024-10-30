import { appWriteConfig, databases } from "@/lib/appWriteConfig";

const searchPostApi = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId
    );

    const filteredPosts = posts?.documents.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    return filteredPosts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default searchPostApi;
