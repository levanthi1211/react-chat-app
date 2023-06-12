import { useContact } from "./../../contact/useContact";
import { getContactAction, selectContact } from "./../../contact/contactSlice";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import { loadingState } from "@/shared/constants/loadingState";
import { startConversationService } from "./addMessage.service";
import { useState, useEffect, useCallback } from "react";
import { useForm, useFormState } from "react-hook-form";
import _ from "lodash";

interface IUseAddMessageProps {
  afterSubmit: any;
}

export const useAddMessage = (props: IUseAddMessageProps) => {
  const [mountedContact, setMountedContact] = useState<any>(null);
  const { afterSubmit } = props;
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [contactLoading, setContactLoading] = useState<loadingState>("IDLE");
  const contactState = useAppSelector(selectContact);
  const { contacts, loadingState } = contactState;
  const dispatch = useAppDispatch();
  const [searchedContacts, setSearchedContacts] = useState<any>([]);
  const addMessageForm = useForm({
    defaultValues: {
      keyword: "",
      email: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = addMessageForm;

  const { dirtyFields } = useFormState({
    control,
  });

  const handleAddMessage = handleSubmit(async (data: any) => {
    try {
      setLoading("LOADING");
      await startConversationService({ emails: [mountedContact?.email] });
      setLoading("COMPLETE");
      afterSubmit();
    } catch (error) {
      setLoading("ERROR");
      console.log(error);
    }
  });

  useEffect(() => {
    dispatch(getContactAction());
  }, [dispatch]);

  useEffect(() => {
    if (loadingState === "COMPLETE") {
      setContactLoading(loadingState);
      setSearchedContacts(contacts);
    }
  }, [contactState]);

  const handleSearchContacts = useCallback(
    (keyword: string) => {
      const searchedContacts = contacts.filter((contact: any) => {
        return contact.email.toLowerCase().includes(keyword.toLowerCase());
      });
      console.log(searchedContacts);
      setSearchedContacts(searchedContacts);
    },
    [contactState]
  );

  const data = {
    register,
    searchedContacts,
    contactLoading,
    addMessageLoading: loading,
    dirtyFields,
    mountedContact,
  };
  const methods = {
    handleAddMessage,
    handleSearchContacts,
    setMountedContact,
  };

  return {
    data,
    methods,
  };
};
