import { useState } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { useForm } from "react-hook-form";
import { selectProfile } from "@/modules/sidebar/components/profile/profileSlice";
import { loadingState } from "@/shared/constants/loadingState";
import { editNameService } from "./editName.service";

interface IUseEditNameProps {
  afterSubmit: () => void;
}

export const useEditName = (props: IUseEditNameProps) => {
  const { afterSubmit } = props;
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;
  const editNameForm = useForm({
    defaultValues: {
      name: profile.name,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = editNameForm;

  const handleSubmitEditName = handleSubmit(async (data: any) => {
    try {
      setLoading("LOADING");
      const response = await editNameService(data);
      setMessage(response.message);
      if (response.success) {
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
    loadingState: loading,
    message,
  };
  const methods = {
    handleSubmitEditName,
  };
  return { data, methods };
};
