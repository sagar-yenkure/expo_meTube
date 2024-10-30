import { useGlobalContext } from "@/context/GlobalProvider";
import { signUpApi, SignUpFormState } from "@/features/authApi/signUpApi";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

const useSignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (form: SignUpFormState) => signUpApi(form),
    onSuccess: (res) => {
      Alert.alert("Success", "Account created successfully!");
      setUser(res);
      setIsLogged(true);
    },
    onError: (error) => {
      Alert.alert(
        "Error",
        error.message || "Something went wrong during sign-up."
      );
    },
  });

  return {
    signUpTrigger: mutate,
    signUpLoading: isPending,
    signUpError: isError,
  };
};

export default useSignUp;
