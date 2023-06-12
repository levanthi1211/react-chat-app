import { loadingState } from "./../../../shared/constants/loadingState";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginService } from "../service/login.service";

export const useLogin = () => {
  const [loadingState, setLoadingState] = useState<loadingState>("IDLE");
  const [message, setMessage] = useState<string>("");
  const loginForm = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = loginForm;
  const handleSubmitLogin = handleSubmit(async (data: any) => {
    try {
      setLoadingState("LOADING");
      const response = await loginService(data);
      setMessage(response.payload);
      setLoadingState("COMPLETE");
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
    handleSubmitLogin,
  };
  return { data, methods };
};
