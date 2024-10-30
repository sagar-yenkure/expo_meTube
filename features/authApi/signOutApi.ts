import { account } from "@/lib/appWriteConfig";

export const signOutApi = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    console.log(error.message);
    // throw new Error(error);
  }
};
