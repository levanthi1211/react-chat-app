import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupService } from "../services/signup.service";
import { loadingState } from "@/shared/constants/loadingState";

export const useSignup = () => {
  const [message, setMessage] = useState<string>("");
  const [loadingState, setLoadingState] = useState<loadingState>("IDLE");
  const signupForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = signupForm;

  const handleSubmitSignup = handleSubmit(async (data: any) => {
    try {
      setLoadingState("LOADING");
      const response = await signupService(data);
      setLoadingState("COMPLETE");
      //setMessage(response.payload.message);
    } catch (error) {
      setLoadingState("ERROR");
      console.log(error);
    }
  });

  const data = {
    register,
    formError: errors,
    loadingState,
    message,
  };
  const methods = {
    handleSubmitSignup,
  };
  return { data, methods };
};
