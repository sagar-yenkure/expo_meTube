import {
  account,
  appWriteConfig,
  avatars,
  databases,
} from "@/lib/appWriteConfig";
import { ID } from "react-native-appwrite";

export interface SignUpFormState {
  username: string;
  email: string;
  password: string;
}
export const signUpApi = async (form: SignUpFormState) => {
  const { username, email, password } = form;
  try {
    // Create a new account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");

    // Generate avatar URL
    const avatarUrl = avatars.getInitials(username);

    // Create a session for the new account
    await account.createEmailPasswordSession(email, password);

    // Create a new user document in the database
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during sign-up");
  }
};
