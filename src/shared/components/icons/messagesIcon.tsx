import { FC } from "react";
import { IconProps } from "./core/iconType";

export const MessagesIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      className={className}
    >
      <path
        d="M416 256V64C416 28.75 387.25 0 352 0H64C28.75 0 0 28.75 0 64V256C0 291.25 28.75 320 64 320H96V372C96 379.125 101.75 384 108 384C110.375 384 112.875 383.25 115.125 381.625L224 320H352C387.25 320 416 291.25 416 256ZM211.375 272L200.375 278.25L144 310.125V272H64C55.25 272 48 264.75 48 256V64C48 55.25 55.25 48 64 48H352C360.75 48 368 55.25 368 64V256C368 264.75 360.75 272 352 272H211.375ZM576 128H448V256C448 308.938 404.938 352 352 352H256V383.969C256 419.215 284.75 447.963 320 447.963H445.75L528.5 510.082C534.875 514.832 544 510.207 544 502.209V447.963H576C611.25 447.963 640 419.215 640 383.969V191.994C640 156.748 611.25 128 576 128Z"
        fill={fill}
      />
    </svg>
  );
};
