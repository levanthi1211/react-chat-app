import { selectApplications } from "./../applications/applicationsSlice";
import { loadingState } from "@/shared/constants/loadingState";
import {
  requestContactService,
  searchContactService,
} from "./requestContact.service";
import { useState } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { useForm, useFormState } from "react-hook-form";

interface IUseERequestContactProps {
  afterSubmit: () => void;
}

export const useRequestContact = (props: IUseERequestContactProps) => {
  const { afterSubmit } = props;
  const [message, setMessage] = useState<string>("");
  const [foundContacts, setFoundContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const applicationsState = useAppSelector(selectApplications);
  const { applications } = applicationsState;
  const requestContactForm = useForm({
    defaultValues: {
      email: "",
      invitationMessage: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = requestContactForm;

  const { dirtyFields } = useFormState({
    control,
  });

  const handleSubmitRequestContact = handleSubmit(async (data: any) => {
    try {
      setLoading("LOADING");
      await requestContactService(data);
      setLoading("COMPLETE");
      afterSubmit();
    } catch (error) {
      console.log(error);
      setLoading("ERROR");
    }
  });

  const handleSearchContact = async (keyword: string) => {
    try {
      if (keyword !== "") {
        const response = await searchContactService({ keyword });
        if (response.success) {
          const foundContacts: any[] = [];
          response.data.contacts.forEach((contact: any) => {
            let isSent = false;
            applications.forEach(async (application: any) => {
              if (application.email === contact.email) {
                isSent = true;
              }
            });
            foundContacts.push({
              ...contact,
              isSent,
            });
          });
          setFoundContacts(foundContacts);
        } else {
          setFoundContacts([]);
        }
      } else {
        setFoundContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    register,
    formError: errors,
    loadingState: loading,
    message,
    foundContacts,
    dirtyFields,
  };
  const methods = {
    handleSubmitRequestContact,
    handleSearchContact,
    setValue,
  };
  return { data, methods };
};
