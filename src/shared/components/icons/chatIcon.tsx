import { FC } from "react";
import { IconProps } from "./core/iconType";

export const ChatIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        d="M448 0H64C28.75 0 0 28.748 0 63.994V351.971C0 387.219 28.75 415.967 64 415.967H160V499.959C160 509.709 171.25 515.459 179.125 509.709L304 415.967H448C483.25 415.967 512 387.219 512 351.971V63.994C512 28.748 483.25 0 448 0ZM264 288H152C138.75 288 128 277.25 128 264S138.75 240 152 240H264C277.25 240 288 250.75 288 264S277.25 288 264 288ZM360 192H152C138.75 192 128 181.25 128 168S138.75 144 152 144H360C373.25 144 384 154.75 384 168S373.25 192 360 192Z"
        fill={fill}
      />
    </svg>
  );
};
