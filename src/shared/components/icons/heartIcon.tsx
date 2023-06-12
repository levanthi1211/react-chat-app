import { FC } from "react";
import { IconProps } from "./core/iconType";

export const HeartIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        d="M472.096 270.486L278.946 470.196C266.304 483.268 245.616 483.268 232.974 470.196L39.824 270.486C-16.197 212.517 -13.104 116.653 49.041 62.862C103.316 15.884 186.371 24.359 236.32 75.925L256.007 96.249L275.694 75.925C325.641 24.36 408.694 15.884 462.969 62.859C525.118 116.649 528.212 212.515 472.096 270.486Z"
        fill={fill}
      />
    </svg>
  );
};