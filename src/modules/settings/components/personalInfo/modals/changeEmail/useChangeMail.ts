import { changeEmailService } from "./changeMail.service";
import { loadingState } from "@/shared/constants/loadingState";
import { useState } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { useForm } from "react-hook-form";
import { selectProfile } from "@/modules/sidebar/components/profile/profileSlice";

interface IUseEditNameProps {
  afterSubmit: () => void;
}

export const useChangeMail = (props: IUseEditNameProps) => {
  const { afterSubmit } = props;
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;
  const changeMailForm = useForm({
    defaultValues: {
      email: profile?.email,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = changeMailForm;

  const handleSubmitChangeEmail = handleSubmit(async (data: any) => {
    try {
      setLoading("LOADING");
      const changeEmailResponse = await changeEmailService(data.email);
      if (changeEmailResponse.success) {
        setLoading("COMPLETE");
      } else {
        setLoading("ERROR");
      }
      afterSubmit();
    } catch (error) {
      console.log(error);
      setLoading("ERROR");
    }
  });

  const data = {
    register,
    formError: errors,
    message,
    loading,
  };
  const methods = {
    handleSubmitChangeEmail,
  };
  return { data, methods };
};
