import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

// Example of accessing environment variables
const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "",
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
  commentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.project);

// Initialize AppWrite services
const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

// Function to get the current account
const getAccount = async () => {
  try {
    return await account.get();
  } catch (error: any) {
    throw new Error(`Failed to get account: ${error.message || error}`);
  }
};

export {
  client,
  account,
  databases,
  avatars,
  storage,
  getAccount,
  appWriteConfig,
};
