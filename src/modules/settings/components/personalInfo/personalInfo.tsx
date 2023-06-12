import { FC, useState } from "react";
import { ChevronDownIcon } from "@/shared/components/icons/chevronDownIcon";
import { EditIcon } from "@/shared/components/icons/editIcon";
import { UserIcon } from "@/shared/components/icons/userIcon";
import clxs, { clsx } from "clsx";
import { EditName } from "./modals/editName/editName";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectProfile } from "@/modules/sidebar/components/profile/profileSlice";
import { EditSignature } from "./modals/editSignature/editSignture";
import { ChangeMail } from "./modals/changeEmail/changeMail";

interface IPersonalInfoProps {
  isOpen: boolean;
  setOpen: any;
}

export const PersonalInfo: FC<IPersonalInfoProps> = (props) => {
  const { isOpen, setOpen } = props;
  const [isOpenEditNameModal, setOpenEditNameModal] = useState(false);
  const [isOpenEditSignatureModal, setOpenEditSignatureModal] = useState(false);
  const [isOpenChangeMail, setOpenChangeMail] = useState(false);

  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;

  return (
    <div className={clxs("w-full")}>
      <div
        className={clxs(
          "w-full h-12 px-5 py-2 flex items-center gap-2 border-b border-slate-100 cursor-pointer",
          [isOpen ? "bg-[#f6f6f7]/70" : ""]
        )}
        onClick={() => {
          setOpen();
        }}
      >
        <div className="shrink-0">
          <UserIcon className="h-4 fill-[#495057]" />
        </div>
        <span className="inline-block grow text-[#495057] font-[500] noselect">
          Personal Info
        </span>
        <div className="shrink-0">
          <ChevronDownIcon
            className={clsx("h-3 fill-[#495057] transition-all duration-250", [
              isOpen && "-rotate-180",
            ])}
          />
        </div>
      </div>
      <div
        className={clxs(
          "w-full border-b border-slate-100 transition-all duration-250",
          [
            isOpen
              ? "max-h-[500px] opacity-100 p-5"
              : "max-h-0 invisible px-5 opacity-0",
          ]
        )}
      >
        <div className="w-full mb-4">
          <div className="flex justify-between items-center">
            <span className="inline-block text-sm text-[#797c8c]">Name</span>
            <div
              className="bg-primary/10 p-2 rounded cursor-pointer"
              onClick={() => setOpenEditNameModal(true)}
            >
              <EditIcon className={clxs("fill-primary h-3")} />
            </div>
          </div>
          <span className="text-sm text-[#496057] font-bold">
            {profile?.name || "((Unamed))"}
          </span>
        </div>
        <div className="w-full mb-4">
          <div className="flex justify-between items-center">
            <span className="inline-block text-sm text-[#797c8c]">
              Signature
            </span>
            <div
              className="bg-primary/10 p-2 rounded cursor-pointer"
              onClick={() => setOpenEditSignatureModal(true)}
            >
              <EditIcon className="fill-primary h-3" />
            </div>
          </div>
          <span className="text-sm text-[#496057] font-bold">
            {profile?.signature || "((Dont have signature))"}
          </span>
        </div>
        <div className="w-full mb-4">
          <div className="flex justify-between items-center">
            <span className="inline-block text-sm text-[#797c8c]">Email</span>
            <div
              className="bg-primary/10 p-2 rounded cursor-pointer"
              onClick={() => setOpenChangeMail(true)}
            >
              <EditIcon className="fill-primary h-3" />
            </div>
          </div>
          <span className="text-sm text-[#496057] font-bold">
            {profile?.email}
          </span>
        </div>
      </div>
      {isOpenEditNameModal && (
        <EditName onClose={() => setOpenEditNameModal(false)} />
      )}
      {isOpenEditSignatureModal && (
        <EditSignature onClose={() => setOpenEditSignatureModal(false)} />
      )}
      {isOpenChangeMail && (
        <ChangeMail onClose={() => setOpenChangeMail(false)} />
      )}
    </div>
  );
};
