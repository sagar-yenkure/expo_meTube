import { account } from "@/lib/appWriteConfig";

export interface SignInFormState {
  email: string;
  password: string;
}
export const signInApi = async ({ email, password }: SignInFormState) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};
