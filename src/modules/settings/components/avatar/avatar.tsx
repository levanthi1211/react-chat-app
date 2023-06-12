import React, { FC, useState } from "react";
import { AcceptIcon } from "@/shared/components/icons/acceptIcon";
import { CameraIcon } from "@/shared/components/icons/cameraIcon";
import { CloseIcon } from "@/shared/components/icons/closeIcon";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectProfile } from "@/modules/sidebar/components/profile/profileSlice";
import { useAvatar } from "./useAvatar";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";
import { getAvatar } from "@/shared/infra/supabase/storage";

export const Avatar: FC = React.memo(() => {
  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;
  const { data, methods } = useAvatar();
  const { preview, inputFileRef } = data;
  const { handleSelectFile, handleCancelPreview, handleUploadFile } = methods;
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <div
      className="bg-cover w-24 h-24 rounded-full p-2 border-4 border-[#fafafa] routline-1 outline-slate-300 mb-4 relative"
      style={{
        backgroundImage: `url(${
          preview
            ? preview
            : profile?.avatar_url
            ? getAvatar(profile?.avatar_url)
            : avatarPlaceholder
        })`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute bg-[#f6f6f9] flex justify-center items-center rounded-full top-16 left-16 h-8 w-8 cursor-pointer z-50">
        <div
          className="bg-white shadow-lg rounded-full flex justify-center items-center p-2 cursor-pointer"
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          <input
            className="hidden"
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            ref={inputFileRef}
            onChange={handleSelectFile}
          />
          <CameraIcon className="h-3 fill-[#495057]" />
        </div>
      </div>
      {isHover && preview && (
        <div className="absolute w-full h-full flex items-center justify-center top-0 left-0 bg-slate-800/20 rounded-full">
          <div
            className="bg-transparent rounded flex justify-center items-center p-2 cursor-pointer"
            onClick={handleUploadFile}
          >
            <AcceptIcon className="fill-green-400 h-3" />
          </div>
          <div
            className="bg-transparent rounded flex justify-center items-center p-2 cursor-pointer"
            onClick={handleCancelPreview}
          >
            <CloseIcon className="fill-red-400 h-3" />
          </div>
        </div>
      )}
    </div>
  );
});
