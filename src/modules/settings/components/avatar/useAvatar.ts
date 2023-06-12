import { uploadAvatarService } from "./avatar.service";
import { getProfileInformationAction } from "../../../sidebar/components/profile/profileSlice";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { supabase } from "@/shared/infra/supabase";

export const useAvatar = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files?.[0]);
  };

  const handleCancelPreview = () => {
    setPreview("");
  };

  const handleUploadFile = async () => {
    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`images/${selectedFile?.name}`, selectedFile);
      if (data && !error) {
        await uploadAvatarService(`images/${selectedFile?.name}`);
        await dispatch(getProfileInformationAction());
        setPreview("");
      }
    }
  };

  const data = { preview, inputFileRef };
  const methods = {
    handleSelectFile,
    handleCancelPreview,
    handleUploadFile,
  };
  return { data, methods };
};
