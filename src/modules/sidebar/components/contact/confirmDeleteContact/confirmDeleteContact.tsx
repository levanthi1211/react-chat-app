import { FC } from "react";
import { CloseIcon } from "@/shared/components/icons/closeIcon";
import _ from "lodash";

interface ConfirmDeleteContactProps {
  onClose: any;
  handleDelete: (id: string) => void;
  id: string;
}

export const ConfirmDeleteContact: FC<ConfirmDeleteContactProps> = (props) => {
  const { onClose, handleDelete, id } = props;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
      <div className="w-[500px] bg-white rounded">
        <div className="flex justify-between p-6 items-center w-full border-b border-slate-100">
          <div>Confirm Delete</div>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon className="h-4" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-2">
          <button
            className="px-4 py-2 text-white bg-primary rounded"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-4 py-2 border border-primary bg-white text-primary rounded"
            onClick={async () => {
              await handleDelete(id);
              onClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
