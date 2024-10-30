import { databases, appWriteConfig } from "@/lib/appWriteConfig";
import uploadFile from "@/lib/uploadFile";
import { ID } from "react-native-appwrite";

const addPostApi = async (form: any) => {
  try {
    // TODO  delete the post option add
    const { creator, isPrivate, title, prompt, thumbnail, video } = form;

    const [thumbnailUrl, videoUrl] = await Promise.all([
      await uploadFile(thumbnail, "image"),
      await uploadFile(video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      ID.unique(),
      {
        thumbnail: thumbnailUrl,
        video: videoUrl,
        title,
        prompt,
        creator,
        isPrivate,
      }
    );

    return newPost;
  } catch (error: any) {
    console.log("error while saving the file in db:", error);
  }
};

export default addPostApi;
