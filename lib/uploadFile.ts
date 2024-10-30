import { ID, ImageGravity } from "react-native-appwrite";
import { appWriteConfig, storage } from "./appWriteConfig";

export const getFilePreview = async (fileId: string, type: string) => {
  let previewUrl;
  try {
    if (type === "video")
      previewUrl = await storage.getFileView(appWriteConfig.bucketId, fileId);

    if (type === "image")
      previewUrl = await storage.getFilePreview(
        appWriteConfig.bucketId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );

    return previewUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

const uploadFile = async (file: any, type: string) => {
  if (!file) throw new Error(`${type} is not selected. Please select.`);

  try {
    const uploadedFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      {
        name: file?.fileName || file?.name,
        type: file?.mimeType,
        size: file?.fileSize || file?.size,
        uri: file?.uri,
      }
    );
    const fileUrl = await getFilePreview(uploadedFile?.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default uploadFile;
