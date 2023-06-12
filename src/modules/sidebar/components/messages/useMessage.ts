import { selectProfile } from "./../profile/profileSlice";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import {
  getAllConversationsService,
  Conversations,
  getAllConversationMasksService,
  getAllConversationMasksRealtime,
  ConversationMask,
} from "./message.service";
import { loadingState } from "@/shared/constants/loadingState";
import { useState, useEffect, useCallback } from "react";
import { setCurrentConversation } from "@/modules/chat/chatSlice";
import { selectChat } from "@/modules/chat/chatSlice";

export const useMessages = () => {
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [conversations, setConversations] = useState<Array<ConversationMask>>(
    []
  );

  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector(selectChat);

  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading("LOADING");
      const response = await getAllConversationMasksService();
      if (response.success) {
        setLoading("COMPLETE");
        console.log(response.listConversationsMask);
        setConversations(response.listConversationsMask);
      } else {
        setLoading("ERROR");
      }
    };
    fetchConversations();
  }, [profile]);

  useEffect(() => {
    if (profile && profile.id) {
      console.log("subscription");
      const unsub = getAllConversationMasksRealtime(
        profile.id,
        getAllConversationMasksService,
        setConversations
      );
      return unsub;
    }
  }, [profile]);

  const handleSetCurrentConversation = (conversationId: string) => {
    dispatch(setCurrentConversation({ conversation: conversationId }));
  };

  const data = {
    loading,
    conversations,
    currentConversation,
  };
  const methods = { handleSetCurrentConversation };

  return {
    data,
    methods,
  };
};
