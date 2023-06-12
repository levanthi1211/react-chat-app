import { FC } from "react";
import { ActionIcon } from "@/shared/components/icons";
import { ActionHorizontalIcon } from "@/shared/components/icons/actionHorizontalIcon";
import { DownloadIcon } from "@/shared/components/icons/downloadIcon";
import { FileIcon } from "@/shared/components/icons/fileIcon";
import { UserIcon } from "@/shared/components/icons/userIcon";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectProfile } from "./profileSlice";
import {
  avatarPlaceholder,
  coverImagePlaceholder,
} from "@/shared/constants/placeholderImages";
import { getAvatar, getCoverImage } from "@/shared/infra/supabase/storage";

export const Profile: FC = () => {
  const profileState = useAppSelector(selectProfile);
  const { profile } = profileState;

  return (
    <div className="w-full h-full relative shadow-[10px_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <div
        className="bg-cover w-full h-[180px] relative top-0 left-0 border-t shadow-sm"
        style={{
          backgroundImage: `url(${
            profile?.cover_image_url
              ? getCoverImage(profile.cover_image_url)
              : coverImagePlaceholder
          })`,
        }}
      >
        <div className="absolute w-full h-auto top-0 left-0 z-10 flex justify-between items-center p-4">
          <h1 className="text-white font-[600] text-[18px]">My Profile</h1>
          <ActionIcon className="h-4 cursor-pointer" fill="white" />
        </div>
      </div>
      <div className="relative left-0 w-full px-[1.5rem] pt-[0.5rem] pb-[2rem] border-b border-slate-100 flex flex-col justify-center items-center mt-[-56px]">
        <div
          className="bg-cover w-24 h-24 rounded-full p-2 border-4 border-[#fafafa] routline-1 outline-slate-300 mb-4"
          style={{
            backgroundImage: `url(${
              profile?.avatar_url
                ? getAvatar(profile.avatar_url)
                : avatarPlaceholder
            })`,
          }}
        ></div>
        <h1 className="font-bold text-gray-700 text-[17px]">
          {profile?.name || "((Unamed))"}
        </h1>
        <p className="text-slate-500 text-[15px]">
          {profile?.signature || "((Dont have signature))"}
        </p>
      </div>
      <div
        className="px-5 overflow-y-scroll scrollbar-hide"
        style={{ height: "calc(100% - 330px)" }}
      >
        <div className="py-5 border-b border-gray-200">
          <span>
            If several languages coalesce, the grammar of the resulting language
            is more simple.
          </span>
          <br></br>
          <div className="flex justify-start items-center mt-4">
            <UserIcon className="h-3 pr-4" fill="#797c8c" /> Le Van Thi (Alex
            Le)
          </div>
          <div className="flex justify-start items-center">
            <UserIcon className="h-3 pr-4" fill="#797c8c" />{" "}
            levanthi.tl9@gmail.com Le)
          </div>
          <div className="flex justify-start items-center">
            <UserIcon className="h-3 pr-4" fill="#797c8c" /> Le Van Thi (Alex
            Le)
          </div>
        </div>
        <div className="py-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <div>MEDIA</div>
            <div>Show more</div>
          </div>
          <div className="flex">
            <div className="w-20 h-20 mr-2 rounded overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
            <div className="w-20 h-20 mr-2 rounded overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
            <div className="w-20 h-20 mr-2 rounded overflow-hidden relative cursor-pointer">
              <div className="absolute w-full h-full bg-[#343a40] opacity-70 flex justify-center items-center">
                <span className="text-white">+ 14</span>
              </div>
              <img
                className="w-full h-full object-cover"
                src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="flex justify-between items-center mb-2">
            <div>ATTACHED FILES</div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex items-center border p-2 mb-2 border-[#f6f6f9] rounded-[4px] w-full">
              <div className="bg-primary/20 w-7 h-7 flex shrink-0 items-center justify-center rounded-full mr-4">
                <FileIcon className="h-4 fill-primary" />
              </div>
              <div className="flex flex-col grow overflow-hidden">
                <span className="text-[14px] font-bold text-[#495057] overflow-hidden text-ellipsis whitespace-nowrap">
                  design-phase-2-final-demo-latest-v10
                </span>
                <span className="text-[13px] text-[#797C8C]">17.6 MB</span>
              </div>
              <div className="h-7 flex shrink-0 items-center justify-between ml-4 gap-4 w-auto">
                <div>
                  <DownloadIcon className="h-4 cursor-pointer" fill="#797c8c" />
                </div>
                <div>
                  <ActionHorizontalIcon
                    className="h-4 cursor-pointer"
                    fill="#797c8c"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center border p-2 mb-2 border-[#f6f6f9] rounded-[4px] w-full">
              <div className="bg-primary/20 w-7 h-7 flex shrink-0 items-center justify-center rounded-full mr-4">
                <FileIcon className="h-4 fill-primary" />
              </div>
              <div className="flex flex-col grow overflow-hidden">
                <span className="text-[14px] font-bold text-[#495057] overflow-hidden text-ellipsis whitespace-nowrap">
                  design-phase-2-final-demo-latest-v10
                </span>
                <span className="text-[13px] text-[#797C8C]">17.6 MB</span>
              </div>
              <div className="h-7 flex shrink-0 items-center justify-between ml-4 gap-4 w-auto">
                <div>
                  <DownloadIcon className="h-4 cursor-pointer" fill="#797c8c" />
                </div>
                <div>
                  <ActionHorizontalIcon
                    className="h-4 cursor-pointer"
                    fill="#797c8c"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center border p-2 mb-2 border-[#f6f6f9] rounded-[4px] w-full">
              <div className="bg-primary/20 w-7 h-7 flex shrink-0 items-center justify-center rounded-full mr-4">
                <FileIcon className="h-4 fill-primary" />
              </div>
              <div className="flex flex-col grow overflow-hidden">
                <span className="text-[14px] font-bold text-[#495057] overflow-hidden text-ellipsis whitespace-nowrap">
                  design-phase-2-final-demo-latest-v10
                </span>
                <span className="text-[13px] text-[#797C8C]">17.6 MB</span>
              </div>
              <div className="h-7 flex shrink-0 items-center justify-between ml-4 gap-4 w-auto">
                <div>
                  <DownloadIcon className="h-4 cursor-pointer" fill="#797c8c" />
                </div>
                <div>
                  <ActionHorizontalIcon
                    className="h-4 cursor-pointer"
                    fill="#797c8c"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center border p-2 mb-2 border-[#f6f6f9] rounded-[4px] w-full">
              <div className="bg-primary/20 w-7 h-7 flex shrink-0 items-center justify-center rounded-full mr-4">
                <FileIcon className="h-4 fill-primary" />
              </div>
              <div className="flex flex-col grow overflow-hidden">
                <span className="text-[14px] font-bold text-[#495057] overflow-hidden text-ellipsis whitespace-nowrap">
                  design-phase-2-final-demo-latest-v10
                </span>
                <span className="text-[13px] text-[#797C8C]">17.6 MB</span>
              </div>
              <div className="h-7 flex shrink-0 items-center justify-between ml-4 gap-4 w-auto">
                <div>
                  <DownloadIcon className="h-4 cursor-pointer" fill="#797c8c" />
                </div>
                <div>
                  <ActionHorizontalIcon
                    className="h-4 cursor-pointer"
                    fill="#797c8c"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center border p-2 mb-2 border-[#f6f6f9] rounded-[4px] w-full">
              <div className="bg-primary/20 w-7 h-7 flex shrink-0 items-center justify-center rounded-full mr-4">
                <FileIcon className="h-4 fill-primary" />
              </div>
              <div className="flex flex-col grow overflow-hidden">
                <span className="text-[14px] font-bold text-[#495057] overflow-hidden text-ellipsis whitespace-nowrap">
                  design-phase-2-final-demo-latest-v10
                </span>
                <span className="text-[13px] text-[#797C8C]">17.6 MB</span>
              </div>
              <div className="h-7 flex shrink-0 items-center justify-between ml-4 gap-4 w-auto">
                <div>
                  <DownloadIcon className="h-4 cursor-pointer" fill="#797c8c" />
                </div>
                <div>
                  <ActionHorizontalIcon
                    className="h-4 cursor-pointer"
                    fill="#797c8c"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
