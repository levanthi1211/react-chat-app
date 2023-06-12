import { useEffect, useState } from "react";
import { selectChat } from "./chatSlice";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import {
  sendMessageService,
  getConversationDetail,
  getConversaionDetaiRealtime,
  ReactMessageReq,
  reactionMessageService,
} from "./chat.service";
import { useForm, useFormState } from "react-hook-form";
import { loadingState } from "@/shared/constants/loadingState";
import { storage } from "@/shared/infra/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useChat = () => {
  const [conversationDetail, setConversationDetail] = useState<any>(undefined);
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [files, setFiles] = useState<any>([]);
  const inputMessageForm = useForm({
    defaultValues: {
      message: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = inputMessageForm;

  const userChatState = useAppSelector(selectChat);
  const { currentConversation } = userChatState;

  const handleSendMessage = handleSubmit(async (data) => {
    const { message } = data;
    const fileUrls: any[] = [];
    if (currentConversation) {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          // files.values contains all the files objects
          const file = files[i];
          const metadata = {
            contentType: file.type,
          };
          const storageRef = ref(storage, file.name);
          const downloadUrl = await uploadBytes(
            storageRef,
            file,
            metadata
          ).then((uploadResult) => {
            return getDownloadURL(uploadResult.ref);
          });
          fileUrls.push({
            type: file.type,
            name: file.name,
            downloadUrl,
          });
        }
      }

      const filesAwait = await Promise.all(fileUrls);
      await sendMessageService({
        conversationId: currentConversation,
        message,
        files: filesAwait,
      });
      reset();
    }
  });

  useEffect(() => {
    if (currentConversation) {
      const unsub = getConversaionDetaiRealtime(
        currentConversation as string,
        getConversationDetail,
        setConversationDetail
      );
      return unsub;
    }
  }, [currentConversation]);

  const handleReactionMessage = async (data: ReactMessageReq) => {
    await reactionMessageService(data);
  };

  const data = {
    register,
    formError: errors,
    conversationDetail,
  };
  const methods = {
    handleSendMessage,
    handleReactionMessage,
    watch,
    setValue,
    setFiles,
  };

  return {
    data,
    methods,
  };
};
