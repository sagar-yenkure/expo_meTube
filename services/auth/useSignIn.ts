import { useGlobalContext } from "@/context/GlobalProvider";
import { signInApi, SignInFormState } from "@/features/authApi/signInApi";
import getCurrentUser from "@/hooks/useGetCurrentUser";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

const useSignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (form: SignInFormState) => signInApi(form),
    onSuccess: async () => {
      Alert.alert("Success", "Sign in successfully!");
      const user = await getCurrentUser();
      setUser(user);
      setIsLogged(true);
    },
    onError: (error) => {
      Alert.alert(error?.message);
    },
  });

  return {
    signInTrigger: mutate,
    signInLoading: isPending,
    signInError: isError,
  };
};

export default useSignIn;
