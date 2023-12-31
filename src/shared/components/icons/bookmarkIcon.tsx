import { FC } from "react";
import { IconProps } from "./core/iconType";

export const BookmarkIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className={className}
    >
      <path
        d="M336 0H48C21.49 0 0 21.492 0 48V479.914C0 504.609 26.791 519.996 48.123 507.555L192 423.625L335.877 507.555C357.209 519.996 384 504.609 384 479.914V48C384 21.492 362.51 0 336 0ZM336 452L192 368L48 452V54C48 50.625 50.625 48 53.999 48H330C333.375 48 336 50.625 336 54V452Z"
        fill={fill}
      />
    </svg>
  );
};
