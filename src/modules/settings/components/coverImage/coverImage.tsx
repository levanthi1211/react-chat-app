import { FC } from "react";
import { EditIcon } from "@/shared/components/icons/editIcon";
import { useCoverImage } from "./useCoverImage";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectProfile } from "@/modules/sidebar/components/profile/profileSlice";
import { coverImagePlaceholder } from "@/shared/constants/placeholderImages";
import { getCoverImage } from "@/shared/infra/supabase/storage";

export const CoverImage: FC = () => {
  const { data, methods } = useCoverImage();
  const { preview, inputFileRef } = data;
  const { handleSelectFile, handleCancelPreview, handleUploadFile } = methods;

  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;

  return (
    <div
      className="bg-cover w-full h-[180px] relative top-0 left-0"
      style={{
        backgroundImage: `url(${
          preview
            ? preview
            : profile?.cover_image_url
            ? getCoverImage(profile?.cover_image_url)
            : coverImagePlaceholder
        })`,
      }}
    >
      <div className="absolute w-full h-auto top-0 left-0 z-10 flex justify-between items-center p-4">
        <h1 className="text-white font-[600] text-[18px]">Settings</h1>
        <div className="flex justify-end items-center gap-2">
          <div
            className="bg-white shadow-lg rounded-full flex justify-center items-center p-2 cursor-pointer"
            onClick={() => {
              inputFileRef.current?.click();
            }}
          >
            <input
              className="hidden"
              type="file"
              name="cover-image"
              accept="image/png, image/jpeg"
              ref={inputFileRef}
              onChange={handleSelectFile}
            />
            <EditIcon className="h-3 fill-[#495057]" />
          </div>
          {preview && (
            <div className="bg-white rounded flex justify-center items-center p-2 cursor-pointer">
              <span
                className="text-[11px] text-[#495057]"
                onClick={handleUploadFile}
              >
                Save
              </span>
            </div>
          )}
          {preview && (
            <div className="bg-white rounded flex justify-center items-center p-2 cursor-pointer">
              <span
                className="text-[11px] text-[#495057]"
                onClick={handleCancelPreview}
              >
                Cancel
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
