import { appWriteConfig, databases, getAccount } from "@/lib/appWriteConfig";
import { Query } from "react-native-appwrite";

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("No user documents found");

    return currentUser.documents[0];
  } catch (error: any) {
    // console.error("Error fetching current user:", error.message || error);
    return null;
  }
}

export default getCurrentUser;
