import { useState } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { useForm } from "react-hook-form";
import { selectProfile } from "../../../../../sidebar/components/profile/profileSlice";
import { loadingState } from "@/shared/constants/loadingState";
import { editSignatureService } from "./editSignature.service";

interface IUseEditSignatureProps {
  afterSubmit: () => void;
}

export const useEditSignature = (props: IUseEditSignatureProps) => {
  const { afterSubmit } = props;
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;
  const editSignatureForm = useForm({
    defaultValues: {
      signature: profile.signature,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = editSignatureForm;

  const handleSubmitEditSignature = handleSubmit(async (data: any) => {
    try {
      setLoading("LOADING");
      const response = await editSignatureService(data);

      if (response.success) {
        setMessage(response.message);
        setLoading("COMPLETE");
        afterSubmit();
      } else {
        setLoading("ERROR");
      }
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
    handleSubmitEditSignature,
  };
  return { data, methods };
};
